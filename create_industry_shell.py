with open('services.html', 'r', encoding='utf-8') as f:
    content = f.read()

header_end = content.find('<main')
if header_end == -1:
    header_end = content.find('<!-- Services Hero')
    
footer_start = content.find('<footer')

if header_end != -1 and footer_start != -1:
    header = content[:header_end]
    footer = content[footer_start:]
    with open('industry.html', 'w', encoding='utf-8') as f:
        f.write(header + '<main>\n<!-- Industry Content Start -->\n\n<!-- Industry Content End -->\n</main>\n' + footer)
    print('Created industry.html shell')
else:
    print('Failed to find header or footer')
