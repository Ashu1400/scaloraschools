"""Convert the four supplied education images to character art for the hero."""
from pathlib import Path
import json, html
from PIL import Image, ImageOps, ImageEnhance, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
SOURCES=[
 ('development','Development','TNIE_import_2022_2_12_original_True.avif',True),
 ('research','Research','hand-student-holding-magnifying-glass-studying-books-stack-books-scientific-research-flat-vector-illustration-education-information-concept-banner-website-design-landing-page_74855-24720.avif',True),
 ('management','Management','resource-management-infographic.webp',True),
 ('innovation','Innovation','219636-0-93761600-1741776847-ideas_innovation_competition_emergence_emerging_technology_thinkstock_537611609-100749532-orig.webp',False)
]
COLS,ROWS=144,66
ramp=' .,:;irsXA253hMHGS#9B&@'
frames=[]
for key,label,name,invert in SOURCES:
 im=ImageOps.exif_transpose(Image.open(Path('C:/Users/Ashwath/Downloads')/name)).convert('L')
 if invert: im=ImageOps.invert(im)
 else: im=ImageOps.autocontrast(im,cutoff=1)
 width=COLS;height=round(im.height/im.width*width*.6)
 if height>ROWS: width=round(width*ROWS/height);height=ROWS
 im=im.resize((width,height),Image.Resampling.LANCZOS)
 grid=Image.new('L',(COLS,ROWS),0);grid.paste(im,((COLS-width)//2,(ROWS-height)//2))
 lines=[]
 for y in range(ROWS):
  line=''
  for x in range(COLS):
   v=grid.getpixel((x,y))/255
   if invert: v=max(0,(v-.075)/.925)**.7
   else: v=v**.9
   line+=ramp[min(len(ramp)-1,round(v*(len(ramp)-1)))]
  lines.append(line)
 text='\n'.join(lines);frames.append({'id':key,'label':label,'text':text})
 (ROOT/'public/ascii'/f'{key}.txt').write_text(text,encoding='utf-8')
(ROOT/'src/data/education-ascii.json').write_text(json.dumps(frames,ensure_ascii=False),encoding='utf-8')
# Review the actual character output, independently of the website/browser.
font=ImageFont.truetype('C:/Windows/Fonts/consola.ttf',12)
cw=font.getlength('M');lineh=12
sheet=Image.new('RGB',(int(cw*COLS)*2+40,ROWS*lineh*2+100),'#175dd3');draw=ImageDraw.Draw(sheet)
for i,frame in enumerate(frames):
 x=20+(i%2)*int(cw*COLS);y=30+(i//2)*(ROWS*lineh+35)
 draw.text((x,y-20),frame['label'],font=font,fill='white')
 for row,text in enumerate(frame['text'].split('\n')):draw.text((x,y+row*lineh),text,font=font,fill='white')
sheet.save(ROOT/'tmp/ascii-review/converted.png')
print('Converted all four source images; 144 x 66 characters each.')
