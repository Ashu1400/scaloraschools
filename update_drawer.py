import glob

files = glob.glob('*.html')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('<a href="#schools" class="drawer-link">For Schools</a>', '<a href="schools.html" class="drawer-link">For Schools</a>')
    content = content.replace('<a href="#industry" class="drawer-link">Industry & Business</a>', '<a href="industry.html" class="drawer-link">For Industry</a>')
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print('Mobile drawer updated')
