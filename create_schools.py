with open('industry.html', 'r', encoding='utf-8') as f:
    content = f.read()

header_end = content.find('<main>')
footer_start = content.find('<footer')

header = content[:header_end]
footer = content[footer_start:]

schools_content = '''<main>
<div style="padding: 200px 5%; text-align: center; font-family: var(--font-sans, 'Inter', sans-serif);">
  <h1 style="font-size: 60px; font-weight: 900; text-transform: uppercase;">For Schools</h1>
  <p style="font-size: 24px; margin-top: 20px;">Coming soon.</p>
</div>
</main>'''

with open('schools.html', 'w', encoding='utf-8') as f:
    f.write(header + schools_content + footer)
