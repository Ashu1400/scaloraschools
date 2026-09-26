from pathlib import Path
import math
p=Path('index.html');s=p.read_text(encoding='utf-8');a=s.index('          <!-- School introduction:');b=s.index('          <!-- Partner Logos Marquee Section -->',a)
paths=[]
for row in range(54):
 points=[]
 for j in range(91):
  x=j/90*1600;u=x/1600
  y=150+row*2.1-85*math.exp(-((u-.51)/.145)**2)+17*math.sin(u*math.pi*4+row*.055)
  points.append(f'{"M" if j==0 else "L"}{x:.1f},{y:.1f}')
 paths.append('<path d="'+' '.join(points)+'"/>')
s=s[:a]+'''          <!-- Reference-matched introduction; no loading overlay. -->
          <section id="home" class="reference-hero" aria-labelledby="reference-title">
            <div class="reference-meta"><span><i></i> SCALORA SCHOOLS</span><span>FOR MINDS THAT WON’T STAND STILL.</span><span>09–12 / AND BEYOND</span></div>
            <div class="reference-content">
              <p class="reference-eyebrow">THE WORLD IS BIGGER THAN YOUR CLASSROOM.</p>
              <h1 id="reference-title"><span>School is just</span><em>the beginning.</em><svg class="reference-star" viewBox="0 0 40 40" aria-hidden="true"><g stroke="#94ad4d" stroke-width="3.8" stroke-linecap="round"><path d="M20 3V37M3 20H37M8 8L32 32M8 32L32 8"/></g><g stroke="#deed94" stroke-width="2" stroke-linecap="round"><path d="M20 3V37M3 20H37M8 8L32 32M8 32L32 8"/></g></svg></h1>
              <p class="reference-description">Follow your curiosity. Make something real.<br>Find out how far you can go.</p>
              <a href="services.html" class="reference-cta">Explore your possibilities <span>↗</span></a>
            </div>
            <svg class="reference-landscape" viewBox="0 0 1600 240" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#7e9f8c" stroke-width=".9" stroke-dasharray=".5 4" stroke-linecap="round">'''+''.join(paths)+'''</g></svg>
            <div class="reference-coordinate reference-left">[ KNOWLEDGE ]<span>YOUR STARTING POINT</span></div>
            <div class="reference-coordinate reference-right">[ POSSIBILITY ]<span>NO FIXED DESTINATION</span></div>
            <button type="button" class="reference-pause" aria-pressed="false">Pause motion</button>
          </section>

'''+s[b:]
s=s.replace('<body>','<body class="reference-home">').replace('<link rel="stylesheet" href="/src/ascii-hero.css">','<link rel="stylesheet" href="/src/ascii-hero.css">\n    <link rel="stylesheet" href="/src/reference-hero.css">')
s=s.replace('<script type="module" src="/src/source-ascii.js"></script>','<script type="module" src="/src/reference-hero.js"></script>')
s=s.replace('class="btn-icreon-contact">Contact</a>','class="btn-icreon-contact">Contact Us</a>')
p.write_text(s,encoding='utf-8')
