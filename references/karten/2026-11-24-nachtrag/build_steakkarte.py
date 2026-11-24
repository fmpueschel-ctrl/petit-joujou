#!/usr/bin/env python3
"""PDF-Nachtrag aus Outlook: Originalseiten unverändert verbinden und prüfen."""
from pathlib import Path
import shutil, subprocess, tempfile, hashlib, json
from pypdf import PdfReader, PdfWriter
from PIL import Image, ImageChops
assets = Path('/home/ubuntu/webdev-static-assets/karten-2026-11-24-nachtrag')
archive = Path('/home/ubuntu/fire400/references/karten/2026-11-24-nachtrag')
(archive/'originale').mkdir(parents=True,exist_ok=True)
sources = [assets/'Petit_Joujou_Steakkarte_Do-So_NOV26.pdf',assets/'Petit_Joujou_Wein_nach_Lust_Leistadt_A4.pdf']
name = 'petit-joujou-steakkarte-do-so-mit-wein-2026-11-24-v2.pdf'
writer=PdfWriter()
for source in sources:
    reader=PdfReader(source)
    assert len(reader.pages)==1
    writer.add_page(reader.pages[0])
with (assets/name).open('wb') as handle:writer.write(handle)
assert len(PdfReader(assets/name).pages)==2
proof=[]
with tempfile.TemporaryDirectory(prefix='steak-nachtrag-') as tmp:
    tmp=Path(tmp)
    for page,source in enumerate(sources,1):
        ref=tmp/f'original-{page}'; output=tmp/f'merged-{page}'
        subprocess.run(['pdftoppm','-f','1','-singlefile','-r','100','-png',str(source),str(ref)],check=True)
        subprocess.run(['pdftoppm','-f',str(page),'-singlefile','-r','100','-png',str(assets/name),str(output)],check=True)
        a=Image.open(str(ref)+'.png').convert('RGB'); b=Image.open(str(output)+'.png').convert('RGB')
        assert a.size==b.size and ImageChops.difference(a,b).getbbox() is None
        proof.append({'page':page,'original':source.name,'pixel_equal':True,'sha256_original':hashlib.sha256(source.read_bytes()).hexdigest()})
        print(f'Seite {page}: pixelgleich mit {source.name}',flush=True)
for source in sources:shutil.copy2(source,archive/'originale'/source.name)
shutil.copy2(assets/name,archive/name)
sha=hashlib.sha256((assets/name).read_bytes()).hexdigest()
(archive/'pdf-treue.json').write_text(json.dumps({'pdf':name,'sha256':sha,'pages':proof},ensure_ascii=False,indent=2)+'\n')
print('Zusammengeführte PDF:',name,'SHA256:',sha)
