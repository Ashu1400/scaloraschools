from pathlib import Path
import json,html
p=Path('index.html');s=p.read_text(encoding='utf-8');frames=json.loads(Path('src/data/education-ascii.json').read_text(encoding='utf-8'))
needle='''              </div>

            </div>
          </section>'''
figure='''              </div>
              <figure class="source-ascii-gallery">
                <div id="source-ascii-art" role="img" aria-label="ASCII illustration of people collaborating on development projects">
                  <pre id="source-ascii-frame" aria-hidden="true">'''+html.escape(frames[0]['text'])+'''</pre>
                </div>
                <figcaption><span id="source-ascii-label">Development</span><button id="source-ascii-pause" type="button" aria-pressed="false" hidden>Pause animation</button></figcaption>
                <div class="source-ascii-choices" role="group" aria-label="Choose an ASCII image" hidden>
'''+''.join(f'                  <button type="button" data-ascii-index="{i}" aria-pressed="{str(i==0).lower()}">{frame["label"]}</button>\n' for i,frame in enumerate(frames))+'''                </div>
              </figure>
            </div>
          </section>'''
assert needle in s;s=s.replace(needle,figure,1)
s=s.replace('    <script type="module" src="/src/main.js"></script>','    <script type="module" src="/src/main.js"></script>\n    <script type="module" src="/src/source-ascii.js"></script>')
p.write_text(s,encoding='utf-8')
