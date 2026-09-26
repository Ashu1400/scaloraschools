import glob

files = glob.glob('*.html')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    old_nav = '<a href="index.html#industries" class="icreon-nav-cell">Industries</a>'
    new_nav = '''<div class="icreon-nav-dropdown-wrapper">
            <a href="#" class="icreon-nav-cell">Industries</a>
            <div class="icreon-dropdown-menu">
              <a href="schools.html">For Schools</a>
              <a href="industry.html">For Industry</a>
            </div>
          </div>'''
    
    if old_nav in content:
        content = content.replace(old_nav, new_nav)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
