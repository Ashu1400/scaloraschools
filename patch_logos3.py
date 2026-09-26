import re

target = '''<img src="/src/Hero_Pics/WhatsApp_Image_2026-09-25_at_7.18.08_AM-removebg-preview.png" alt="Scalora Schools" style="height: 120px; width: auto; object-fit: contain; transform: scale(1.4) translateX(25px); transform-origin: left center;" />'''

pattern = re.compile(r'<img src="/src/Hero_Pics/WhatsApp_Image_2026-09-25_at_7.18.08_AM-removebg-preview.png" alt="Scalora Schools" style="height: 70px; width: auto; object-fit: contain; transform: scale\(2\.2\); transform-origin: left center;" />')

files = ['index.html', 'services.html', 'about.html', 'contact.html', 'contact-school.html', 'contact-industry.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    content = pattern.sub(target, content)
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print('Done adjusting logos without overflow!')
