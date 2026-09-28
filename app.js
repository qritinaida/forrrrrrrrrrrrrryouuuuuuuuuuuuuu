// ==============================================================================
// 💖 FOR YOU - Couple Surprise Logic & Interactions
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  applyConfigData();
  setupHeartsCanvas();
  setupAudioPlayer();
  setupEnvelopeScreen();
  setupQuestionGame();
  setupCelebrateButton();
}

// ------------------------------------------------------------------------------
// 1. นำข้อมูลจาก CONFIG มาแสดงผลบนหน้าเว็บ
// ------------------------------------------------------------------------------
function applyConfigData() {
  if (typeof CONFIG === 'undefined') return;

  // ข้อมูลซองจดหมาย
  setText('env-badge', CONFIG.envelope && CONFIG.envelope.badge);
  setText('env-title', CONFIG.envelope && CONFIG.envelope.title);
  setText('env-tagline', CONFIG.envelope && CONFIG.envelope.tagline);
  setText('wax-text', CONFIG.envelope && CONFIG.envelope.sealText);

  // ข้อมูลคำถาม
  setText('q-title', CONFIG.question && CONFIG.question.title);
  setText('q-sub', CONFIG.question && CONFIG.question.subtitle);
  setText('btn-yes-text', CONFIG.question && CONFIG.question.yesBtn);
  setText('btn-no-text', CONFIG.question && CONFIG.question.noBtn);
  setText('success-title', CONFIG.question && CONFIG.question.successTitle);
  setText('success-subtitle', CONFIG.question && CONFIG.question.successSubtitle);

  // ข้อมูลจดหมาย
  setText('letter-title', CONFIG.loveLetter && CONFIG.loveLetter.title);
  setText('letter-closing', CONFIG.loveLetter && CONFIG.loveLetter.closing);
  setText('letter-signoff', CONFIG.loveLetter && CONFIG.loveLetter.signOff);

  // ท้ายเว็บ
  setText('footer-text', (CONFIG.footer && CONFIG.footer.text) || "Made with all my heart for you 💕");
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

// ------------------------------------------------------------------------------
// 2. ซองจดหมาย 3D & การเปิดตัวเว็บเซอร์ไพรส์
// ------------------------------------------------------------------------------
let isOpened = false;

function setupEnvelopeScreen() {
  const envelopeBox = document.getElementById('envelope-box');
  const envelopeScreen = document.getElementById('envelope-screen');
  const mainContent = document.getElementById('main-content');

  if (!envelopeBox) return;

  const openSurprise = () => {
    if (isOpened) return;
    isOpened = true;

    // แอนิเมชันเปิดฝาซองจดหมาย
    envelopeBox.classList.add('open');

    // ยิงพลุหัวใจฉลอง
    fireHeartConfetti();

    // เริ่มเล่นเพลง
    playMusic();

    // รอแอนิเมชันซองจดหมาย แล้วเปิดหน้าจอหลัก
    setTimeout(() => {
      envelopeScreen.classList.add('opened');
      mainContent.classList.remove('hidden');

      // เริ่มพิมพ์จดหมายเมื่อเลื่อนมาเห็น
      setupLetterScrollTrigger();
    }, 1200);
  };

  envelopeBox.addEventListener('click', openSurprise);
}

// ------------------------------------------------------------------------------
// 3. ระบบเล่นเพลงพื้นหลัง (พร้อม Music Box Chime สำรองกรณีไม่มีไฟล์ MP3)
// ------------------------------------------------------------------------------
let audio = document.getElementById('bg-audio');
let musicBtn = document.getElementById('music-btn');
let isPlaying = false;
let audioContext = null;
let synthInterval = null;

function setupAudioPlayer() {
  if (!audio || !musicBtn) return;

  if (CONFIG.music && CONFIG.music.src) {
    audio.src = CONFIG.music.src;
    audio.volume = CONFIG.music.volume || 0.6;
  }

  musicBtn.addEventListener('click', toggleMusic);

  // ถ้าไฟล์เพลงโหลดไม่ได้หรือไม่พบ (404) จะสลับมาใช้เสียงดนตรี Music Box สังเคราะห์แทนอัตโนมัติ
  audio.addEventListener('error', () => {
    console.log("Audio file not found or failed, using romantic synth fallback.");
  });
}

function playMusic() {
  if (!audio) return;

  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isPlaying = true;
      musicBtn.classList.add('playing');
    }).catch(() => {
      // หากเบราว์เซอร์บล็อกหรือไฟล์ mp3 ไม่พบ ให้เปิดเพลงกล่องดนตรีจำลอง
      startMusicBoxSynth();
      isPlaying = true;
      musicBtn.classList.add('playing');
    });
  }
}

function toggleMusic() {
  if (isPlaying) {
    if (audio) audio.pause();
    stopMusicBoxSynth();
    isPlaying = false;
    musicBtn.classList.remove('playing');
  } else {
    if (audio && audio.src && !audio.error) {
      audio.play().then(() => {
        isPlaying = true;
        musicBtn.classList.add('playing');
      }).catch(() => {
        startMusicBoxSynth();
        isPlaying = true;
        musicBtn.classList.add('playing');
      });
    } else {
      startMusicBoxSynth();
      isPlaying = true;
      musicBtn.classList.add('playing');
    }
  }
}

// กล่องดนตรีจำลองสุดละมุน (Romantic Music Box Synth ด้วย Web Audio API)
function startMusicBoxSynth() {
  if (synthInterval) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!audioContext) audioContext = new AudioCtx();
    if (audioContext.state === 'suspended') audioContext.resume();

    // ท่วงทำนองโน้ตเพลงโรแมนติก
    const notes = [
      261.63, 329.63, 392.00, 493.88, // C4, E4, G4, B4
      523.25, 392.00, 440.00, 349.23, // C5, G4, A4, F4
      293.66, 349.23, 440.00, 523.25, // D4, F4, A4, C5
      392.00, 329.63, 293.66, 261.63  // G4, E4, D4, C4
    ];
    let noteIdx = 0;

    synthInterval = setInterval(() => {
      playChime(notes[noteIdx % notes.length]);
      noteIdx++;
    }, 450);
  } catch (e) {
    console.warn("Audio Context not supported");
  }
}

function stopMusicBoxSynth() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}

function playChime(freq) {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioContext.currentTime);

  gain.gain.setValueAtTime(0.08, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.2);

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start();
  osc.stop(audioContext.currentTime + 1.2);
}



// ------------------------------------------------------------------------------
// 5. คำถามวัดใจสุดน่ารัก (ปุ่ม 'ไม่รัก' วิ่งหนีเมาส์และนิ้วแตะ)
// ------------------------------------------------------------------------------
function setupQuestionGame() {
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const card = document.getElementById('question-card');
  const answersWrapper = document.getElementById('answers-wrapper');
  const noToast = document.getElementById('no-toast');
  const successBox = document.getElementById('success-box');

  if (!btnYes || !btnNo || !card) return;

  let yesScale = 1;
  let responseIdx = 0;

  // ฟังก์ชันสุ่มย้ายปุ่ม 'ไม่รัก' หนี
  const dodgeButton = (e) => {
    if (e && e.cancelable) e.preventDefault();

    const cardRect = card.getBoundingClientRect();

    // คำนวณระยะหลบไม่ให้หลุดออกนอกการ์ดหรือหน้าจอมือถือ
    const maxOffsetX = Math.min(cardRect.width / 2 - 50, 130);
    const maxOffsetY = 70;

    const randomX = (Math.random() - 0.5) * maxOffsetX * 2;
    const randomY = (Math.random() - 0.5) * maxOffsetY * 2;

    btnNo.style.position = 'relative';
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // ขยายขนาดปุ่ม 'รัก' ให้ใหญ่ขึ้นเรื่อยๆ
    yesScale += 0.08;
    btnYes.style.transform = `scale(${yesScale})`;

    // แสดงข้อความหยอกล้อน่ารักๆ
    const responses = CONFIG.question.noResponses || [
      "อย่าแกล้งกดปุ่มนี้ซี่! 🥺",
      "รักเค้าเถอะนะคนดี 💕",
      "จับไม่ได้หรอก แบร่ 😝"
    ];

    noToast.textContent = responses[responseIdx % responses.length];
    noToast.classList.remove('hidden');
    responseIdx++;

    // สั่นเบาๆ ให้ดูมีชีวิตชีวา
    playChime(587.33); // D5
  };

  // ดักจับทั้งเมาส์เลื่อนผ่านและการแตะบนมือถือ
  btnNo.addEventListener('mouseenter', dodgeButton);
  btnNo.addEventListener('touchstart', dodgeButton, { passive: false });
  btnNo.addEventListener('click', dodgeButton);

  // เมื่อกดปุ่ม 'รักสิ'
  btnYes.addEventListener('click', () => {
    answersWrapper.style.display = 'none';
    noToast.classList.add('hidden');
    successBox.classList.remove('hidden');

    // ยิงพลุหัวใจเฉลิมฉลองชุดใหญ่
    fireHeartConfetti();
    setTimeout(fireHeartConfetti, 400);
    setTimeout(fireHeartConfetti, 800);

    // เลื่อนหน้าจอลงไปที่จดหมายความในใจให้อัตโนมัติ
    setTimeout(() => {
      const letterSection = document.getElementById('letter-section');
      if (letterSection) {
        letterSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1400);
  });
}

// ------------------------------------------------------------------------------
// 7. จดหมายความในใจ (พิมพ์ข้อความทีละตัวอักษร Typewriter Effect)
// ------------------------------------------------------------------------------
let letterTyped = false;

function setupLetterScrollTrigger() {
  const letterSection = document.getElementById('letter-section');
  if (!letterSection) return;

  if (!('IntersectionObserver' in window)) {
    letterTyped = true;
    typeLoveLetter();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !letterTyped) {
        letterTyped = true;
        typeLoveLetter();
      }
    });
  }, { threshold: 0.15 });

  observer.observe(letterSection);
}

function typeLoveLetter() {
  const letterBody = document.getElementById('letter-body');
  if (!letterBody || !CONFIG.loveLetter || !CONFIG.loveLetter.paragraphs) return;

  letterBody.innerHTML = '';
  const paragraphs = CONFIG.loveLetter.paragraphs;
  let pIndex = 0;

  function typeNextParagraph() {
    if (pIndex >= paragraphs.length) return;

    const p = document.createElement('p');
    letterBody.appendChild(p);

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    p.appendChild(cursor);

    const text = paragraphs[pIndex];
    let charIndex = 0;

    function typeChar() {
      if (charIndex < text.length) {
        cursor.before(text.charAt(charIndex));
        charIndex++;
        setTimeout(typeChar, Math.random() * 20 + 25);
      } else {
        cursor.remove();
        pIndex++;
        setTimeout(typeNextParagraph, 300);
      }
    }

    typeChar();
  }

  typeNextParagraph();
}

// ------------------------------------------------------------------------------
// 8. ปุ่มส่งหัวใจฉลอง (Celebrate Button)
// ------------------------------------------------------------------------------
let heartClicks = 0;

function setupCelebrateButton() {
  const btn = document.getElementById('btn-celebrate');
  const countNumber = document.getElementById('count-number');
  if (!btn) return;

  btn.addEventListener('click', () => {
    heartClicks++;
    if (countNumber) countNumber.textContent = heartClicks;

    // เอฟเฟกต์พลุหัวใจ
    fireHeartConfetti();
    playChime(783.99); // G5 chime

    // ลูกเล่นคำชมเมื่อกดรัวๆ
    if (heartClicks === 10) {
      alert("ว้าว! ส่งความรักมาให้ตั้ง 10 ดวงแล้ว ขอบคุณนะคะคนดี 🥰💖");
    } else if (heartClicks === 50) {
      alert("โหหห 50 ดวงแล้ว! รักเธอที่สุดในจักรวาลเลย! 🚀💕");
    }
  });
}

// ------------------------------------------------------------------------------
// 9. ละอองหัวใจและประกายวิ้งๆ บน Canvas พื้นหลัง
// ------------------------------------------------------------------------------
function setupHeartsCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const maxParticles = 35;

  class FloatingParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 0.9 + 0.5;
      this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.4;
      this.opacity = Math.random() * 0.45 + 0.2;
      this.color = ['#ff758c', '#ff8fa3', '#ffb3c1', '#f6ad55', '#ffccd5'][Math.floor(Math.random() * 5)];
      this.isHeart = Math.random() > 0.4; // 60% หัวใจ, 40% ประกายวิ้ง
      this.swing = Math.random() * 2;
      this.swingSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
      this.y -= this.speedY;
      this.swing += this.swingSpeed;
      this.x += Math.sin(this.swing) * 0.5;

      if (this.y < -30) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.translate(this.x, this.y);

      if (this.isHeart) {
        const s = this.size / 15;
        ctx.scale(s, s);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20);
        ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);
        ctx.fill();
      } else {
        // ประกายวิ้งๆ (Sparkle Star)
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new FloatingParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// ------------------------------------------------------------------------------
// 10. พลุหัวใจ Confetti
// ------------------------------------------------------------------------------
function fireHeartConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ff4d6d', '#ff758c', '#ff8fa3', '#ffd166', '#ffffff']
    });
  }
}
