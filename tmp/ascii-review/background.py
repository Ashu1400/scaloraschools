from pathlib import Path
p=Path('index.html');s=p.read_text(encoding='utf-8');needle='            <svg class="reference-landscape"';assert needle in s;s=s.replace(needle,'            <canvas id="reference-ascii-background" aria-hidden="true"></canvas>\n'+needle,1);p.write_text(s,encoding='utf-8')
