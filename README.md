# 💖 For You - เว็บเซอร์ไพรส์คนรักสุดน่ารัก (Romantic Surprise Web App)

เว็บเซอร์ไพรส์แฟน/คนพิเศษ ดีไซน์มินิมอล น่ารัก อบอุ่น โทนสีพาสเทล พร้อมลูกเล่น Interactive แบบ Step-by-Step ออกแบบมาให้เป็น Static Web (HTML5 + CSS3 + Vanilla JavaScript) **พร้อมอัปโหลดขึ้น GitHub และเปิดใช้งาน GitHub Pages ได้ฟรีทันที 100%!**

---

## ✨ ลูกเล่นและฟีเจอร์เด่น (Features)

1. 💌 **ซองจดหมายปริศนา (3D Wax Seal Envelope)**:
   - ตราประทับขี้ผึ้งสีแดงหรูหรา แตะเปิดซองจดหมาย 3D พร้อมเริ่มเล่นเสียงเพลงและจุดพลุหัวใจ
2. 😜 **คำถามวัดใจปุ่มวิ่งหนี (Playful Question Game)**:
   - คำถามน่ารักๆ "ถามจริงๆ นะ... รักเค้ามั้ย?" ปุ่ม "ไม่รัก" จะแกล้งขยับหนีเมาส์และนิ้วแตะบนมือถือ พร้อมข้อความหยอกล้อ ส่วนปุ่ม "รักสิ" จะยิ่งขยายใหญ่ขึ้นเรื่อยๆ
3. 📝 **จดหมายความในใจ (Typewriter Love Letter)**:
   - กระดาษจดหมายวินเทจสุดโรแมนติก พร้อมเอฟเฟกต์ตัวอักษรค่อยๆ พิมพ์ออกมาทีละตัว (Typewriter Effect)
4. 💖 **ปุ่มส่งหัวใจฉลอง (Celebrate Button)**:
   - ปุ่มกดส่งหัวใจรัวๆ พร้อมตัวนับจำนวนดวง และเอฟเฟกต์พลุหัวใจกระจายเต็มจอ
5. 🎵 **เพลงและเสียงกล่องดนตรี (Romantic Audio)**:
   - รองรับไฟล์ `.mp3` และมีระบบเสียงกล่องดนตรี (Music Box Synth) เล่นให้อัตโนมัติแม้ไม่มีไฟล์เพลง
6. 🌸 **ละอองหัวใจและประกายวิ้งลอยบนหน้าจอ (Canvas Particles)**:
   - ลื่นไหล 60 FPS สวยงามทั้งบนหน้าจอคอมพิวเตอร์และมือถือ

---

## 🛠️ วิธีการปรับแต่งข้อความและเพลง (Customization in `config.js`)

คุณสามารถแก้ไขข้อความทั้งหมดได้ง่ายๆ ในไฟล์ **`config.js`** เพียงไฟล์เดียว:

```javascript
const CONFIG = {
  // 1. เพลงพื้นหลัง (ใส่ไฟล์ mp3 ใน assets/music/ หรือใส่ URL เพลงได้เลย)
  music: {
    src: "assets/music/romantic.mp3",
    volume: 0.6,
  },

  // 2. หน้าซองจดหมาย
  envelope: {
    badge: "A SPECIAL LETTER FOR YOU",
    title: "มีของขวัญและความในใจจะบอก...",
    tagline: "แตะที่ซองจดหมายเพื่อเปิดดูนะ 💌",
    sealText: "LOVE",
  },

  // 3. คำถามวัดใจสุดน่ารัก
  question: {
    title: "ถามจริงๆ นะ... รักเค้ามั้ยเอ่ย? 🥺",
    subtitle: "ตอบตามความจริงนะ ห้ามโกหกเด็ดขาด!",
    yesBtn: "รักที่สุดในโลกเลย! 💕",
    noBtn: "ไม่รักหรอก 😜",
  },

  // 4. ข้อความจดหมายความในใจ
  loveLetter: {
    title: "ถึงคนดีของเค้า...",
    paragraphs: [
      "ขอบคุณที่ก้าวเข้ามาเป็นส่วนหนึ่งในชีวิตเค้านะครับ...",
      "รักเธอที่สุดในโลกเลยนะ 💖"
    ],
    closing: "รักเสมอและตลอดไป,",
    signOff: "จากคนนี้เอง 🥰"
  }
};
```

---

## 🚀 วิธีนำขึ้น GitHub และเปิด GitHub Pages ใน 3 ขั้นตอน

### ขั้นตอนที่ 1: อัปโหลดโค้ดขึ้น GitHub Repository
1. เข้าไปที่ [GitHub.com](https://github.com) แล้วกด **New repository**
2. ตั้งชื่อ เช่น `foryou` (ตั้งเป็น **Public**) แล้วกด **Create repository**
3. รันคำสั่งใน Terminal:
```bash
git add .
git commit -m "feat: customize surprise web"
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git push -u origin main
```

### ขั้นตอนที่ 2: เปิดใช้งาน GitHub Pages
1. ในหน้า Repository บน GitHub ให้ไปที่แถบ **Settings** (การตั้งค่า)
2. เมนูด้านซ้าย เลือก **Pages**
3. ในหัวข้อ **Build and deployment** > **Branch**:
   - เปลี่ยนจาก `None` เป็น `main`
   - โฟลเดอร์เลือกเป็น `/ (root)`
4. กด **Save**

### ขั้นตอนที่ 3: รับลิงก์ส่งให้แฟน! 🎉
- รอประมาณ 1 นาที GitHub จะสร้างลิงก์เว็บไซต์ให้คุณ เช่น:
  `https://your-username.github.io/foryou/`
- สามารถส่งลิงก์เซอร์ไพรส์แฟนใน LINE, IG, Messenger ได้ทันทีครับ!

---

## 📂 โครงสร้างโฟลเดอร์ (Directory Structure)

```text
foryou/
├── index.html            # โครงสร้างหน้าเว็บหลัก (ซองจดหมาย -> คำถาม -> จดหมาย)
├── style.css             # สไตล์และการตกแต่งธีมสีพาสเทล
├── config.js             # 🌟 ไฟล์ตั้งค่าหลัก (ข้อความ, คำถาม, จดหมาย, เพลง)
├── app.js                # ระบบ Interactive, ปุ่มหนี, Typewriter, พลุหัวใจ
├── README.md             # คู่มือแนะนำการใช้งาน
└── assets/
    └── music/            # โฟลเดอร์สำหรับใส่เพลง .mp3
        └── README.txt
```

Made with 💖 for someone special.
