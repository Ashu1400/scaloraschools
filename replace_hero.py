import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# The hero section starts with <section id="home" class="reference-hero" aria-labelledby="reference-title">
# and ends right before <!-- Partner Logos Marquee Section -->
# If <!-- Partner Logos Marquee Section --> is not found, we just replace <section id="home"... to </section>
# Wait, let's use a regex to match the section.
pattern = re.compile(r'<section id="home".*?</section>', re.DOTALL)

new_hero = """<section id="home" class="neobrutalist-hero">
  <style>
    .neobrutalist-hero {
      position: relative;
      width: 100%;
      min-height: calc(100vh - 73px);
      background-color: #fcfbf9;
      background-image: 
        linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px);
      background-size: 40px 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 60px 5%;
      font-family: var(--font-sans, 'Inter', sans-serif);
      color: #000;
      overflow: hidden;
    }

    .neo-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      max-width: 1300px;
      width: 100%;
      align-items: center;
      z-index: 2;
    }

    /* Left Side Content */
    .neo-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .neo-badge {
      background: #000;
      color: #fff;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      font-size: 14px;
      padding: 8px 16px;
      letter-spacing: 2px;
      margin-bottom: 30px;
    }

    .neo-headline {
      font-size: clamp(45px, 6vw, 85px);
      font-weight: 900;
      line-height: 0.95;
      text-transform: uppercase;
      letter-spacing: -0.02em;
      margin: 0 0 30px 0;
    }

    .neo-headline-box {
      display: inline-block;
      background: #1a56db;
      color: #fff;
      padding: 5px 20px;
      border: 4px solid #000;
      box-shadow: 6px 6px 0px #000;
      transform: rotate(-2deg);
      margin: 10px 0;
      white-space: nowrap;
    }

    .neo-paragraph {
      font-size: clamp(16px, 1.5vw, 20px);
      line-height: 1.5;
      color: #333;
      border-left: 4px solid #ff1493;
      padding-left: 20px;
      max-width: 500px;
      font-weight: 500;
    }

    /* Right Side Graphics */
    .neo-graphics {
      position: relative;
      height: 500px;
      width: 100%;
    }

    .neo-window {
      position: absolute;
      background: #fff;
      border: 4px solid #000;
      box-shadow: 12px 12px 0px #000;
      display: flex;
      flex-direction: column;
    }

    .neo-window-header {
      background: #000;
      color: #fff;
      padding: 8px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      font-weight: bold;
    }

    .neo-window-dots {
      display: flex;
      gap: 6px;
    }

    .neo-window-dots span {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
    .neo-window-dots span:nth-child(1) { background: #00d2ff; }
    .neo-window-dots span:nth-child(2) { background: #ff00ff; }
    .neo-window-dots span:nth-child(3) { background: #00ffff; }

    /* Main Window */
    .neo-main-window {
      top: 50px;
      left: 10%;
      width: 80%;
      z-index: 2;
    }

    .neo-main-content {
      padding: 30px;
      text-align: left;
    }

    .neo-main-content h3 {
      font-size: 24px;
      font-weight: 800;
      margin: 0 0 15px 0;
    }

    .neo-main-content p {
      font-size: 14px;
      font-weight: 500;
      margin: 0 0 25px 0;
    }

    .neo-input {
      width: 100%;
      padding: 15px;
      border: 2px solid #000;
      background: #f4f4f4;
      font-family: inherit;
      font-size: 14px;
      margin-bottom: 15px;
      font-weight: 500;
      outline: none;
    }

    .neo-btn {
      width: 100%;
      padding: 15px;
      border: 3px solid #000;
      background: #00ffff;
      color: #000;
      font-weight: 800;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s;
    }
    
    .neo-btn:hover {
      background: #00e6e6;
      box-shadow: 4px 4px 0px #000;
      transform: translate(-2px, -2px);
    }

    /* Back Window */
    .neo-back-window {
      top: 0;
      right: 0;
      width: 60%;
      z-index: 1;
      transform: rotate(5deg);
    }

    .neo-back-window .neo-window-header {
      background: #1a56db;
    }

    .neo-back-content {
      padding: 20px;
      display: flex;
      align-items: flex-end;
      gap: 15px;
      height: 150px;
    }

    .neo-bar {
      width: 30px;
      border: 3px solid #000;
      border-bottom: none;
    }
    .neo-bar-1 { height: 60%; background: #00ffff; }
    .neo-bar-2 { height: 100%; background: #ff1493; }
    .neo-bar-3 { height: 40%; background: #fff; }

    /* Sticky Note */
    .neo-sticky {
      position: absolute;
      bottom: -30px;
      left: -20px;
      background: #1a56db;
      border: 3px solid #000;
      padding: 15px;
      color: #fff;
      font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
      font-size: 15px;
      transform: rotate(-6deg);
      z-index: 3;
      box-shadow: 6px 6px 0px #000;
      width: 200px;
    }

    .neo-pin {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 15px;
      height: 15px;
      background: #ff1493;
      border: 2px solid #000;
      border-radius: 50%;
    }

    @media (max-width: 900px) {
      .neo-container {
        grid-template-columns: 1fr;
      }
      .neo-graphics {
        height: 400px;
        margin-top: 40px;
      }
    }
  </style>

  <div class="neo-container">
    <div class="neo-content">
      <div class="neo-badge">SYSTEM V2.0</div>
      <h1 class="neo-headline">
        THE <br>
        <span class="neo-headline-box">OPERATING<br>SYSTEM</span> <br>
        FOR STUDENT <br>
        INNOVATION.
      </h1>
      <p class="neo-paragraph">
        No more boring classrooms. Research, build, and launch real startups in a structured, high-energy environment.
      </p>
    </div>

    <div class="neo-graphics">
      <!-- Back Window -->
      <div class="neo-window neo-back-window">
        <div class="neo-window-header">
          <span>research_data.sys</span>
        </div>
        <div class="neo-back-content">
          <div class="neo-bar neo-bar-1"></div>
          <div class="neo-bar neo-bar-2"></div>
          <div class="neo-bar neo-bar-3"></div>
        </div>
      </div>

      <!-- Main Window -->
      <div class="neo-window neo-main-window">
        <div class="neo-window-header">
          <span>C:\\SCALORA\\dashboard.exe</span>
          <div class="neo-window-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div class="neo-main-content">
          <h3>ACCESS GATEWAY</h3>
          <p>Enter your institutional credentials to initialize the IRDME framework.</p>
          <input type="text" class="neo-input" placeholder="student@school.edu">
          <button class="neo-btn">SYSTEM <span>→</span></button>
        </div>

        <!-- Sticky Note -->
        <div class="neo-sticky">
          <div class="neo-pin"></div>
          REMINDER:<br>
          Project pitches are due on Friday! 🔥
        </div>
      </div>
    </div>
  </div>
</section>"""

new_html = pattern.sub(lambda m: new_hero, html, count=1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)
