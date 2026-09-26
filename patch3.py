import os

index_path = r'c:\Users\Ashwath\Downloads\scaloraschools_new\index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

start_tag = '          <!-- Contact: choose the partnership that fits your organisation. -->'
end_tag = '          </section>'

start_idx = content.find(start_tag)
if start_idx != -1:
    end_idx = content.find(end_tag, start_idx) + len(end_tag)
    
    new_cta = '''          <!-- Improved Modern CTA Section -->
          <section class="premium-cta-section" id="contact" aria-labelledby="contact-title">
            <div class="premium-cta-bg-glow"></div>
            <div class="premium-cta-container">
              <div class="premium-cta-header">
                <span class="premium-cta-badge">Partner With Us</span>
                <h2 id="contact-title">Shape the future of education.</h2>
                <p>Join our ecosystem of forward-thinking schools and industry leaders.</p>
              </div>
              <div class="premium-cta-cards">
                <a class="premium-card school-card" href="mailto:hello@scaloraschools.com?subject=School%20partnership">
                  <div class="card-icon">🏛️</div>
                  <h3>For Schools</h3>
                  <p>Integrate real-world projects and leadership modules into your curriculum.</p>
                  <span class="card-link">Start a conversation <span>→</span></span>
                </a>
                <a class="premium-card industry-card" href="mailto:hello@scaloraschools.com?subject=Industry%20partnership">
                  <div class="card-icon">🌐</div>
                  <h3>For Industry</h3>
                  <p>Mentor students and build early talent pipelines through live projects.</p>
                  <span class="card-link">Become a partner <span>→</span></span>
                </a>
              </div>
            </div>
          </section>'''
          
    content = content[:start_idx] + new_cta + content[end_idx:]
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Replaced CTA section.")
else:
    print("Could not find CTA section.")
