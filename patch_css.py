import os

css_path = r'c:\Users\Ashwath\Downloads\scaloraschools_new\src\style.css'
with open(css_path, 'a', encoding='utf-8') as f:
    f.write('''

/* Premium CTA Section */
.premium-cta-section {
  position: relative;
  padding: 120px 5%;
  background-color: #0b1121; /* Deep premium dark blue */
  color: white;
  overflow: hidden;
  text-align: center;
  font-family: 'Inter', sans-serif;
}

.premium-cta-bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vw;
  background: radial-gradient(circle, rgba(23,93,211,0.15) 0%, rgba(11,17,33,0) 70%);
  z-index: 1;
  pointer-events: none;
}

.premium-cta-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.premium-cta-header {
  margin-bottom: 60px;
}

.premium-cta-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #8bb4f6;
}

.premium-cta-header h2 {
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -2px;
  margin: 0 0 15px 0;
  background: linear-gradient(135deg, #ffffff 0%, #a5c6ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.premium-cta-header p {
  font-size: 18px;
  color: #a0aec0;
  max-width: 600px;
  margin: 0 auto;
}

.premium-cta-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.premium-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 50px 40px;
  text-align: left;
  text-decoration: none;
  color: white;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.premium-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.premium-card:hover {
  transform: translateY(-10px);
  border-color: rgba(255,255,255,0.2);
  box-shadow: 0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(23,93,211,0.2);
}

.premium-card:hover::before {
  opacity: 1;
}

.card-icon {
  font-size: 40px;
  margin-bottom: 25px;
  background: rgba(255,255,255,0.1);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.05);
}

.premium-card h3 {
  font-size: 28px;
  margin: 0 0 15px 0;
  font-weight: 600;
}

.premium-card p {
  color: #a0aec0;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 30px 0;
}

.card-link {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  color: #8bb4f6;
  transition: color 0.3s ease;
}

.card-link span {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.premium-card:hover .card-link {
  color: #ffffff;
}

.premium-card:hover .card-link span {
  transform: translateX(5px);
}

@media (max-width: 900px) {
  .premium-cta-cards {
    grid-template-columns: 1fr;
  }
  .premium-cta-header h2 {
    font-size: 40px;
  }
}
''')
print("Appended premium CTA styles.")
