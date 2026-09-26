import glob

files = glob.glob('*.html')

old_nav = '''<div class="icreon-nav-dropdown-wrapper">
            <a href="#" class="icreon-nav-cell">Industries</a>
            <div class="icreon-dropdown-menu">
              <a href="schools.html">For Schools</a>
              <a href="industry.html">For Industry</a>
            </div>
          </div>'''

new_nav = '''<a href="schools.html" class="icreon-nav-cell">For Schools</a>
          <a href="industry.html" class="icreon-nav-cell">For Industry</a>'''

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    if old_nav in content:
        content = content.replace(old_nav, new_nav)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
