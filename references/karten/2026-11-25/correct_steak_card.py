#!/usr/bin/env python3
"""Entfernt ausschließlich den nächsten-Seite-Verweis und die zweite PDF-Seite."""
from pathlib import Path
import shutil, subprocess, tempfile, hashlib, json
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream
from PIL import Image, ImageChops

root=Path('/home/ubuntu/fire400')
source=root/'references/karten/2026-11-24-nachtrag/petit-joujou-steakkarte-do-so-mit-wein-2026-11-24-v2.pdf'
archive=root/'references/karten/2026-11-25'
assets=Path('/home/ubuntu/webdev-static-assets/karten-2026-11-25')
(archive/'originale').mkdir(parents=True,exist_ok=True);assets.mkdir(parents=True,exist_ok=True)
name='petit-joujou-steakkarte-do-so-2026-11-25.pdf'
target='Weinkarte mit passenden Weinen auf der nächsten Seite.'
reader=PdfReader(source);assert len(reader.pages)==2
page=reader.pages[0];original_text=page.extract_text();original_stream=ContentStream(page.get_contents(),reader)
state={'index':-1,'bt':None,'et':None};matches=[]
def before(op,args,cm,tm):
    state['index']+=1
    if op==b'BT':state['bt']=state['index']
    if op==b'ET':state['et']=state['index']
def visitor(text,cm,tm,font,size):
    if target in text:
        assert text.strip()==target, 'Textblock enthält weitere Inhalte'
        assert state['index']==state['et']
        matches.append({'start':state['bt'],'end':state['et'],'text':text,'cm':cm,'tm':tm,'font_size':size})
page.extract_text(visitor_operand_before=before,visitor_text=visitor)
assert len(matches)==1
start,end=matches[0]['start'],matches[0]['end']
assert original_stream.operations[start][1]==b'BT'
assert original_stream.operations[end][1]==b'ET'
allowed={b'BT',b'ET',b'Tf',b'Tm',b'Tj',b'TJ',b'Td',b'TD',b'Tc',b'Tw',b'Tz',b'TL',b'Tr',b'Ts'}
assert all(op in allowed for _,op in original_stream.operations[start:end+1])
expected_ops=original_stream.operations[:start]+original_stream.operations[end+1:]
modified_stream=ContentStream(page.get_contents(),reader);modified_stream.operations=expected_ops
page.replace_contents(modified_stream)
writer=PdfWriter();writer.add_page(page)
with (assets/name).open('wb') as handle:writer.write(handle)
output=PdfReader(assets/name);assert len(output.pages)==1
assert target not in output.pages[0].extract_text()
assert output.pages[0].extract_text().splitlines()==[line for line in original_text.splitlines() if line!=target]
assert ContentStream(output.pages[0].get_contents(),output).operations==expected_ops
assert output.pages[0].mediabox==page.mediabox
with tempfile.TemporaryDirectory(prefix='steak-nov25-') as temp:
    temp=Path(temp)
    for pdf,prefix in [(source,'original'),(assets/name,'corrected')]:
        subprocess.run(['pdftoppm','-f','1','-singlefile','-r','150','-png',str(pdf),str(temp/prefix)],check=True)
    old=Image.open(temp/'original.png').convert('RGB');new=Image.open(temp/'corrected.png').convert('RGB')
    assert old.size==new.size
    delta=ImageChops.difference(old,new);bbox=delta.getbbox();assert bbox is not None
    # Geprüfte Differenz darf ausschließlich eine einzelne schmale Textzeile betreffen.
    assert bbox[3]-bbox[1]<40 and bbox[2]-bbox[0]<old.width*0.85
    delta_gray=delta.convert('L')
    # Kein hinzugefügter Vordergrund: neue Pixel sind überall innerhalb der Differenz heller.
    import numpy as np
    oa=np.asarray(old,dtype=np.int16);na=np.asarray(new,dtype=np.int16)
    assert ((na-oa)>=-1).all()
    shutil.copy2(temp/'corrected.png',assets/'steakkarte-2026-11-25.png')
shutil.copy2(source,archive/'originale'/source.name);shutil.copy2(assets/name,archive/name)
proof={'source':source.name,'output':name,'pages_before':2,'pages_after':1,'removed_text':target,'removed_operations':[start,end],'all_remaining_content_operations_identical':True,'all_remaining_extracted_text_identical':True,'page_size_unchanged':True,'render_difference_bbox_150dpi':bbox,'only_single_text_line_removed':True,'sha256':hashlib.sha256((assets/name).read_bytes()).hexdigest()}
(archive/'pdf-korrektur.json').write_text(json.dumps(proof,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(proof,ensure_ascii=False,indent=2))
