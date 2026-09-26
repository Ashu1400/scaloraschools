import glob

files = glob.glob('*.html')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    target = '<a href="index.html#impact" class="icreon-nav-cell">Impact</a>'
    if target in content:
        content = content.replace(target, '')
        # Clean up empty lines
        lines = [line for line in content.split('\n') if line.strip() != '' or line == '']
        with open(file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        print(f'Removed from {file}')
