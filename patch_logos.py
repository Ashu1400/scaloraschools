import re

target = '''<img src="/src/Hero_Pics/WhatsApp_Image_2026-09-25_at_7.18.08_AM-removebg-preview.png" alt="Scalora Schools" style="height: 45px; width: auto; object-fit: contain;" />'''

pattern1 = re.compile(r'<div class="brand-name">\s*<span>SCALORA</span>\s*<span>SCHOOLS</span>\s*</div>')
pattern2 = re.compile(r'<div class="brand-name"><span>SCALORA</span><span>SCHOOLS</span></div>')

files = ['services.html', 'about.html', 'contact.html', 'contact-school.html', 'contact-industry.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = pattern1.sub(target, content)
    content = pattern2.sub(target, content)
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print('Done replacing logos!')
