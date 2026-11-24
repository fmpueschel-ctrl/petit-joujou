#!/usr/bin/env python3
"""Steak-Seite plus Wein-nach-Lust-Seite unverändert zu einer PDF verbinden."""
from pathlib import Path
import hashlib
import shutil
import subprocess
import tempfile
from pypdf import PdfReader, PdfWriter
from PIL import Image, ImageChops

upload = Path('/home/ubuntu/upload')
archive = Path('/home/ubuntu/fire400/references/karten/2026-11-24')
assets = Path('/home/ubuntu/webdev-static-assets/karten-2026-11-24')
sources = [upload / 'Petit_Joujou_Steakkarte_Do-So_NOV26.pdf', upload / 'Petit_Joujou_Wein_nach_Lust_Leistadt_A4.pdf']
name = 'petit-joujou-steakkarte-do-so-mit-wein-2026-11-24.pdf'
writer = PdfWriter()
for source in sources:
    reader = PdfReader(source)
    assert len(reader.pages) == 1, source.name
    writer.add_page(reader.pages[0])
with (assets / name).open('wb') as handle:
    writer.write(handle)
assert len(PdfReader(assets / name).pages) == 2
with tempfile.TemporaryDirectory(prefix='steak-nov24-') as tmp:
    tmp = Path(tmp)
    for page_number, source in enumerate(sources, 1):
        reference = tmp / f'original-{page_number}'
        output = tmp / f'merged-{page_number}'
        subprocess.run(['pdftoppm', '-f', '1', '-singlefile', '-r', '100', '-png', str(source), str(reference)], check=True)
        subprocess.run(['pdftoppm', '-f', str(page_number), '-singlefile', '-r', '100', '-png', str(assets / name), str(output)], check=True)
        original_image = Image.open(str(reference) + '.png').convert('RGB')
        merged_image = Image.open(str(output) + '.png').convert('RGB')
        assert original_image.size == merged_image.size
        assert ImageChops.difference(original_image, merged_image).getbbox() is None, f'Page {page_number} changed'
        print(f'Seite {page_number}: pixelgleich mit {source.name}', flush=True)
shutil.copy2(assets / name, archive / name)
for source in sources:
    shutil.copy2(source, archive / 'originale' / source.name)
for source_name in ['Joujou_Flaschenweinkarte_A4.pdf', 'Joujou_Flaschenweinkarte_Broschuere_DIN_A3.pdf', 'Joujou_Flaschenweinkarte_Broschuere_DIN_A4.pdf']:
    shutil.copy2(upload / source_name, archive / 'originale' / source_name)
bottle_name = 'petit-joujou-flaschenweinkarte-2026-11-24.pdf'
assert len(PdfReader(upload / 'Joujou_Flaschenweinkarte_A4.pdf').pages) == 15
shutil.copy2(upload / 'Joujou_Flaschenweinkarte_A4.pdf', assets / bottle_name)
shutil.copy2(upload / 'Joujou_Flaschenweinkarte_A4.pdf', archive / bottle_name)
print('A4-Flaschenweinkarte: 15 Seiten, bytegleich übernommen', flush=True)
print('Steak-SHA256:', hashlib.sha256((assets / name).read_bytes()).hexdigest(), flush=True)
