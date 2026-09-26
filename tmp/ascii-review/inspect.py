from PIL import Image, ImageOps, ImageDraw
from pathlib import Path
paths=[Path(r'C:/Users/Ashwath/Downloads/TNIE_import_2022_2_12_original_True.avif'),Path(r'C:/Users/Ashwath/Downloads/hand-student-holding-magnifying-glass-studying-books-stack-books-scientific-research-flat-vector-illustration-education-information-concept-banner-website-design-landing-page_74855-24720.avif')]
sheet=Image.new('RGB',(1000,500),'white')
for i,p in enumerate(paths):
 im=Image.open(p).convert('RGB');print(p.name,im.size);im=ImageOps.contain(im,(490,450));sheet.paste(im,(i*500,25))
sheet.save('tmp/ascii-review/sources.png')
