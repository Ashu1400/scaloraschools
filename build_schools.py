import re

with open('industry.html', 'r', encoding='utf-8') as f:
    content = f.read()

# We extract everything between <!-- Industry Content Start --> or similar.
# Wait, my previous script just replaced the whole <main> or inserted into <main>.
# Let's extract the header and footer from schools.html.

with open('schools.html', 'r', encoding='utf-8') as f:
    schools_content = f.read()

header_end = schools_content.find('<main>')
footer_start = schools_content.find('</main>') + 7

header = schools_content[:header_end]
footer = schools_content[footer_start:]

schools_html = """
<main>
<style>
  .industry-page {
    background-color: #fcfbf9;
    color: #000;
    font-family: var(--font-sans, 'Inter', sans-serif);
    padding-bottom: 100px;
  }

  /* Hero Section */
  .ind-hero {
    position: relative;
    width: 100%;
    min-height: 80vh;
    background-color: #fcfbf9;
    background-image: 
      linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    display: flex;
    align-items: center;
    padding: 100px 5% 60px;
    overflow: hidden;
  }

  .ind-hero-content {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    z-index: 2;
  }

  .ind-badge {
    display: inline-block;
    background: #000;
    color: #fff;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    font-size: 14px;
    padding: 8px 16px;
    letter-spacing: 2px;
    margin-bottom: 30px;
  }

  .ind-title {
    font-size: clamp(45px, 6vw, 90px);
    font-weight: 900;
    line-height: 0.95;
    text-transform: uppercase;
    letter-spacing: -0.03em;
    margin: 0 0 30px 0;
  }

  .ind-title-highlight {
    display: inline-block;
    background: #ff1493;
    color: #fff;
    padding: 5px 25px;
    border: 4px solid #000;
    box-shadow: 8px 8px 0px #000;
    transform: rotate(-1deg);
    margin: 15px 0;
  }

  .ind-subtitle {
    font-size: clamp(18px, 2vw, 24px);
    line-height: 1.5;
    color: #333;
    max-width: 700px;
    font-weight: 500;
    margin-bottom: 40px;
    border-left: 5px solid #1a56db;
    padding-left: 25px;
  }

  /* Section Styles */
  .ind-section {
    padding: 100px 5%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .ind-section-title {
    font-size: clamp(35px, 4vw, 55px);
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 50px;
    position: relative;
    display: inline-block;
  }
  
  .ind-section-title::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 15px;
    background: #00ffff;
    z-index: -1;
    transform: skew(-20deg);
  }

  /* Grid Layouts */
  .ind-grid-4 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }

  .ind-card {
    background: #fff;
    border: 3px solid #000;
    padding: 30px;
    box-shadow: 8px 8px 0px #000;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
  }

  .ind-card:hover {
    transform: translate(-4px, -4px);
    box-shadow: 12px 12px 0px #000;
  }

  .ind-card-number {
    font-family: 'Courier New', monospace;
    font-size: 40px;
    font-weight: 900;
    color: #ff1493;
    margin-bottom: 15px;
    line-height: 1;
  }

  .ind-card h3 {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 15px;
    text-transform: uppercase;
  }

  .ind-card p {
    font-size: 16px;
    line-height: 1.5;
    color: #444;
    font-weight: 500;
  }

  /* Banner */
  .ind-banner {
    background: #000;
    color: #fff;
    padding: 40px;
    margin: 60px 0;
    border: 4px solid #000;
    box-shadow: 10px 10px 0px #1a56db;
    text-align: center;
    transform: rotate(1deg);
  }

  .ind-banner h2 {
    font-size: clamp(24px, 3vw, 40px);
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
  }

  .ind-banner span {
    color: #00ffff;
  }

  /* Engaging ways */
  .ind-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 40px;
  }

  .ind-tag {
    background: #fff;
    border: 2px solid #000;
    padding: 10px 20px;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    box-shadow: 4px 4px 0px #000;
    border-radius: 30px;
  }

  .ind-tag:nth-child(even) {
    background: #ff1493;
    color: #fff;
  }
  
  .ind-tag:nth-child(3n) {
    background: #00ffff;
    color: #000;
  }

  /* Process Steps */
  .ind-process {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  @media (min-width: 900px) {
    .ind-process {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }
  }

  .ind-step {
    flex: 1;
    position: relative;
    padding: 20px;
    background: #fff;
    border: 3px solid #000;
    box-shadow: 6px 6px 0px #000;
    text-align: center;
  }

  .ind-step-arrow {
    display: none;
    font-size: 40px;
    font-weight: 900;
    color: #1a56db;
    align-self: center;
  }
  
  @media (min-width: 900px) {
    .ind-step-arrow { display: block; }
  }

  .ind-step h3 {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  .ind-step p {
    font-size: 15px;
    font-weight: 500;
  }

  /* Contact CTA */
  .ind-cta {
    background: #ff1493;
    padding: 80px 5%;
    color: #fff;
    border-top: 5px solid #000;
    border-bottom: 5px solid #000;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .ind-cta h2 {
    font-size: clamp(40px, 5vw, 70px);
    font-weight: 900;
    margin: 0 0 20px;
    text-transform: uppercase;
  }

  .ind-cta-details {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 40px;
    flex-wrap: wrap;
  }

  .ind-cta-btn {
    display: inline-block;
    background: #00ffff;
    color: #000;
    padding: 15px 40px;
    font-size: 20px;
    font-weight: 800;
    text-decoration: none;
    border: 4px solid #000;
    box-shadow: 6px 6px 0px #000;
    transition: transform 0.2s;
  }

  .ind-cta-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px #000;
  }
</style>

<div class="industry-page">
  <section class="ind-hero">
    <div class="ind-hero-content">
      <div class="ind-badge">EDUCATION X INDUSTRY</div>
      <h1 class="ind-title">
        CONNECT YOUR STUDENTS WITH <br>
        <span class="ind-title-highlight">THE INDUSTRY OF</span> <br>
        TOMORROW.
      </h1>
      <p class="ind-subtitle">
        Build early connections for your students through practical learning, industry exposure, workshops, and real-world projects.
      </p>
    </div>
  </section>

  <section class="ind-section">
    <h2 class="ind-section-title">What Your School Gets</h2>
    <div class="ind-grid-4">
      <div class="ind-card">
        <div class="ind-card-number">01</div>
        <h3>Direct Industry Connect</h3>
        <p>Students interact directly with companies through workshops, projects, and industry sessions.</p>
      </div>
      <div class="ind-card">
        <div class="ind-card-number">02</div>
        <h3>Early Talent Development</h3>
        <p>Identify promising student paths and start building their future careers early.</p>
      </div>
      <div class="ind-card">
        <div class="ind-card-number">03</div>
        <h3>School Visibility</h3>
        <p>Introduce your institution's talent and culture to the next generation of employers.</p>
      </div>
      <div class="ind-card">
        <div class="ind-card-number">04</div>
        <h3>Future Talent Pipeline</h3>
        <p>Build meaningful connections for your students to become future interns, employees, or collaborators.</p>
      </div>
    </div>
  </section>

  <div class="ind-section">
    <div class="ind-banner">
      <h2>YOUR SCHOOL DOESN'T JUST TEACH STUDENTS. <br> <span>IT BECOMES PART OF THEIR CAREER JOURNEY.</span></h2>
    </div>
  </div>

  <section class="ind-section">
    <h2 class="ind-section-title">More Than Just A Connection</h2>
    <p style="font-size: 20px; font-weight: 500; max-width: 800px; margin-bottom: 30px;">
      Give your students multiple ways to engage with companies, gain industry knowledge, and discover future careers.
    </p>
    
    <div class="ind-tags">
      <div class="ind-tag">Industry Speaker</div>
      <div class="ind-tag">Competition Judge</div>
      <div class="ind-tag">Mentor</div>
      <div class="ind-tag">Challenge Partner</div>
      <div class="ind-tag">Industry Visit / Exposure</div>
      <div class="ind-tag">Project / Case Study Partner</div>
      <div class="ind-tag">Career & Expert Session</div>
      <div class="ind-tag">Future Talent Connect</div>
    </div>
  </section>

  <section class="ind-section">
    <h2 class="ind-section-title">Turn Connection Into Collaboration</h2>
    <p style="font-size: 20px; font-weight: 500; max-width: 800px; margin-bottom: 50px;">
      Choose how your school wants to engage. We coordinate the right opportunity with the right companies.
    </p>
    
    <div class="ind-process">
      <div class="ind-step">
        <div class="ind-card-number" style="font-size: 24px;">01</div>
        <h3>Connect</h3>
        <p>Tell us what your students need.</p>
      </div>
      <div class="ind-step-arrow">→</div>
      <div class="ind-step">
        <div class="ind-card-number" style="font-size: 24px;">02</div>
        <h3>Match</h3>
        <p>We identify the right industry opportunity.</p>
      </div>
      <div class="ind-step-arrow">→</div>
      <div class="ind-step">
        <div class="ind-card-number" style="font-size: 24px;">03</div>
        <h3>Engage</h3>
        <p>Your students interact with companies.</p>
      </div>
      <div class="ind-step-arrow">→</div>
      <div class="ind-step">
        <div class="ind-card-number" style="font-size: 24px;">04</div>
        <h3>Build</h3>
        <p>Continue the relationship.</p>
      </div>
    </div>
  </section>

  <section class="ind-section">
    <h2 class="ind-section-title">Ways To Start</h2>
    <div class="ind-grid-4">
      <div class="ind-card" style="box-shadow: 8px 8px 0px #00ffff;">
        <h3>Start Small</h3>
        <p>One expert session or career interaction for your students.</p>
      </div>
      <div class="ind-card" style="box-shadow: 8px 8px 0px #1a56db;">
        <h3>Bring a Challenge</h3>
        <p>Give students a real industry problem to solve.</p>
      </div>
      <div class="ind-card" style="box-shadow: 8px 8px 0px #ff1493;">
        <h3>Build an Experience</h3>
        <p>Host an industry visit, workshop or practical activity.</p>
      </div>
      <div class="ind-card" style="box-shadow: 8px 8px 0px #000;">
        <h3>Build a Pipeline</h3>
        <p>Develop long-term student and talent engagement with companies.</p>
      </div>
    </div>
  </section>

  <section class="ind-cta">
    <div class="ind-badge" style="background: #fff; color: #000;">READY TO BUILD THE CONNECTION?</div>
    <h2>YOUR STUDENTS.<br>THEIR CURIOSITY.<br><span style="color: #00ffff;">ONE CONNECTION.</span></h2>
    <p style="font-size: 22px; font-weight: 500; margin-top: 20px;">Let's create meaningful opportunities for the next generation of talent.</p>
    
    <div class="ind-cta-details">
      <a href="mailto:scaloraacademy@gmail.com" class="ind-cta-btn">scaloraacademy@gmail.com</a>
      <a href="tel:+919625196435" class="ind-cta-btn" style="background: #1a56db; color: #fff;">+91 96251 96435</a>
    </div>
  </section>
</div>
</main>
"""

with open('schools.html', 'w', encoding='utf-8') as f:
    f.write(header + schools_html + footer)
