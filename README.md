# 👤 IAcine Virtual 3D Avatar | AI-Powered Conversational Assistant  

![image](https://github.com/user-attachments/assets/531f9bcf-a64b-4161-82cc-304ec2eb81b0)

## 📖 Introduction  

**IAcine Virtual Avatar** is a cutting-edge AI-powered 3D assistant designed to deliver human-like, real-time interactions. Blending conversational AI with lifelike animation and voice synthesis, this project demonstrates how virtual avatars can revolutionize interviews, customer service, learning environments, and beyond. 🧠🗣️

Built using **OpenAI's GPT model** (GPT-4/GPT-4o), voice generation from **ElevenLabs**, and 3D animation crafted in **Blender**, this assistant brings together the best of **AI, speech, and 3D rendering** — combining cloud-based intelligence with immersive visuals.  



## 🚀 Features  

✔️ **Realistic 3D Avatar** – Modeled, rigged, and animated in Blender with FBX/GLB export  
✔️ **AI-Powered Dialogue** – Uses OpenAI’s GPT model for intelligent and human-like conversations  
✔️ **Voice Synthesis** – Integrates ElevenLabs for human-like text-to-speech output  
✔️ **Real-Time Lip Sync** – Lip movements generated via Rhubarb Lip Sync for full immersion  
✔️ **Custom Prompts** – Adaptable for interviews, character roleplay, personal assistant, and more  
✔️ **Smooth Integration** – Simple setup with GPT and ElevenLabs APIs  



## 🏗️ Technologies  

- 🐍 **Python 3.12** – Core backend & pipeline  
- 🧠 **OpenAI GPT-4 / GPT-4o** – Language model for natural conversations  
- 🔊 **ElevenLabs API** – Voice synthesis engine  
- 🖼️ **Blender + FBX/GLB** – 3D avatar modeling & animation  
- 💻 **Rhubarb Lip Sync** – Automated lip synchronization  
- 🎮 **React Three Fiber / Three.js** – For 3D rendering in the browser  
- 🌐 **Flask** – Lightweight backend for UI (if web version used)  
- 📁 **dotenv** – Secure API key management  

## 📦 Installation  

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/Yacine-Mekideche/IAcine-3D-Avatar.git
cd IAcine-3D-Avatar
```

### **2️⃣ Set Up Your Environment**

In the .env file, add your OpenAI and ElevenLabs API keys:

```bash
OPENAI_API_KEY=your_openai_key_here
ELEVENLABS_API_KEY=your_elevenlabs_key_here
```

### **3️⃣ Create Virtual Environment**

Using venv:

```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
```


### **4️⃣ Install Dependencies**

```bash
pip install -r requirements.txt
```



## ▶️ Running the Project

### 🧠 Start the AI Backend  
From the `back` directory, start the backend server:
```bash
cd back
node index.js
```

This will handle voice input, GPT responses, ElevenLabs integration, and lip sync file generation.




### 🖥️ Start the Frontend Interface
From the front directory, run the web UI:
```bash
cd front
npm install
npm run dev
```

Once the frontend is running, open your browser at:

```bash
http://localhost:5173
```

You’ll see the 3D animated avatar in action, responding to your voice in real time.



## AWS Technical Architecture

![image](https://github.com/user-attachments/assets/c6b95ccc-ad07-4c58-8f88-a6bc5afa7ac3)


## 🎯 Demo

<a href="https://www.youtube.com/watch?v=aE5e4JSH658" target="_blank">
  <img src="https://img.youtube.com/vi/aE5e4JSH658/maxresdefault.jpg" alt="IAcine 3D AI Avatar - Demo Video" style="max-width:100%; height:auto;">
</a



---

## 📬 Contact Me

💡 **Let's connect! Whether you're interested in AI, Machine Learning, or tech collaborations, feel free to reach out.**  

[![Website](https://img.shields.io/badge/My%20Website-%23000000.svg?style=for-the-badge&logo=About.me&logoColor=white)](https://iacine.tech)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yacine-mekideche/)  
[![GitHub](https://img.shields.io/badge/GitHub-%2312100E.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Yacine-Mekideche)  
[![Malt](https://img.shields.io/badge/Malt-%23FF6F61.svg?style=for-the-badge&logo=malt&logoColor=white)](https://malt.fr/profile/yacinemekideche)  
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@iacine_tech)  

📩 **Email for business inquiries:** contact@iacine.tech  
