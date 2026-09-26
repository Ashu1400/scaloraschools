import re

files = ['industry.html', 'schools.html', 'index.html']

def update_colors(content):
    # ind-banner
    content = content.replace('background: #000;', 'background: #0f3f96;') # Dark Navy background for banner
    content = content.replace('box-shadow: 10px 10px 0px #ff1493;', 'box-shadow: 10px 10px 0px #175dd3;')
    content = content.replace('box-shadow: 10px 10px 0px #1a56db;', 'box-shadow: 10px 10px 0px #175dd3;')
    content = content.replace('color: #00ffff;', 'color: #93b6eb;')
    
    # Replace other pink/cyan instances to blue palette
    content = content.replace('#ff1493', '#175dd3') # Hot pink -> Royal blue
    content = content.replace('#00ffff', '#93b6eb') # Cyan -> Light blue
    content = content.replace('#1a56db', '#0f3f96') # Blue -> Navy blue
    content = content.replace('#00e6e6', '#a7c1e3') # Cyan hover -> Light blue hover
    return content

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = update_colors(content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {file}")
