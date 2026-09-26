from pathlib import Path
p=Path('index.html');s=p.read_text(encoding='utf-8');old='<a href="services.html" class="reference-cta">Explore your possibilities <span>↗</span></a>';assert old in s
s=s.replace(old,'''<div class="reference-actions">
                <a href="services.html" class="reference-cta">Explore your possibilities <span aria-hidden="true">↗</span></a>
                <a href="contact.html" class="reference-secondary">For your school <span aria-hidden="true">↗</span></a>
              </div>
              <p class="reference-benefits"><span>Real projects</span><span>Industry exposure</span><span>Student leadership</span></p>''',1)
p.write_text(s,encoding='utf-8')
p=Path('src/reference-hero.js');s=p.read_text(encoding='utf-8')
s=s.replace('rgba(67,112,87,','rgba(58,104,183,').replace('rgba(91,132,108,','rgba(84,128,192,').replace('Math.min(.48,.15+depth*.22+Math.max(0,roll)*.14)','Math.min(.45,.16+depth*.20+Math.max(0,roll)*.16)').replace('.045+band*.005','.055+band*.006')
s=s.replace('function sync(){button.textContent=',"function sync(){hero.classList.toggle('motion-paused',paused());button.textContent=")
p.write_text(s,encoding='utf-8')
