import re

target = '''<div class="brand-name">
            <span>SCALORA</span>
            <span>SCHOOLS</span>
          </div>'''

pattern = re.compile(r'<img src="/src/Hero_Pics/WhatsApp_Image_2026-09-25_at_7.18.08_AM-removebg-preview.png"[^>]*>')

files = ['index.html', 'services.html', 'about.html', 'contact.html', 'contact-school.html', 'contact-industry.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = pattern.sub(target, content)
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print('Done reverting logos back to text!')
