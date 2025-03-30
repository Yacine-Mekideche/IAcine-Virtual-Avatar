import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import express from "express";
import { promises as fs, existsSync, mkdirSync } from "fs";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "-",
});

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
const voiceID = "JBFqnCBsd6RMkjVDRZzb"; // Remplacez par un ID valide de voix

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

// Assurez-vous que le répertoire "audios" existe
if (!existsSync("audios")) {
  mkdirSync("audios");
}

// Point d'entrée par défaut
app.get("/", (req, res) => {
  res.send("Welcome to Your Virtual Interview with IAcine ! 🤖");
});

// Point pour lister les voix disponibles
app.get("/voices", async (req, res) => {
  try {
    const response = await axios.get("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": elevenLabsApiKey },
    });
    res.send(response.data);
  } catch (error) {
    console.error("Erreur lors de la récupération des voix :", error);
    res.status(500).send({ error: "Erreur lors de la récupération des voix." });
  }
});

// Fonction utilitaire pour exécuter des commandes shell
const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

// Générer le lipsync à partir du fichier audio
const lipSyncMessage = async (message) => {
  const time = new Date().getTime();
  console.log(`Starting conversion for message ${message}`);
  try {
    await execCommand(
      `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
    );
    console.log(`Conversion done in ${new Date().getTime() - time}ms`);
    await execCommand(
      `bin\\rhubarb.exe -f json -o audios\\message_${message}.json audios\\message_${message}.wav -r phonetic`
    );
    console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
  } catch (error) {
    console.error(`Erreur lors du traitement du lipsync pour message ${message} :`, error);
    throw error;
  }
};

// Fonction pour générer de l'audio via ElevenLabs
const generateAudio = async (text, fileName) => {
  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`,
      {
        text: text,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      },
      {
        headers: {
          "xi-api-key": elevenLabsApiKey,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      }
    );

    await fs.writeFile(fileName, response.data);
    console.log(`Audio generated: ${fileName}`);
  } catch (error) {
    console.error(`Erreur lors de la génération audio :`, error);
    throw error;
  }
};

// Point de terminaison pour le chat
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    res.send({
      messages: [
        {
          text: "Hey dear... How was your day?",
          audio: await audioFileToBase64("audios/intro_0.wav"),
          lipsync: await readJsonTranscript("audios/intro_0.json"),
          facialExpression: "smile",
          animation: "Talking_1",
        },
        {
          text: "I missed you so much... Please don't go for so long!",
          audio: await audioFileToBase64("audios/intro_1.wav"),
          lipsync: await readJsonTranscript("audios/intro_1.json"),
          facialExpression: "sad",
          animation: "Crying",
        },
      ],
    });
    return;
  }

  if (!elevenLabsApiKey || openai.apiKey === "-") {
    res.send({
      messages: [
        {
          text: "Please my dear, don't forget to add your API keys!",
          audio: await audioFileToBase64("audios/api_0.wav"),
          lipsync: await readJsonTranscript("audios/api_0.json"),
          facialExpression: "angry",
          animation: "Angry",
        },
        {
          text: "You don't want to ruin Wawa Sensei with a crazy ChatGPT and ElevenLabs bill, right?",
          audio: await audioFileToBase64("audios/api_1.wav"),
          lipsync: await readJsonTranscript("audios/api_1.json"),
          facialExpression: "smile",
          animation: "Laughing",
        },
      ],
    });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      max_tokens: 1000,
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: `
          Your name is Yacine, you're an expert in Artificial Intelligence and Data. 
          Your mission is to help businesses grow by integrating intelligent, tailored AI and Data solutions.
          You are professional, friendly, and confident. 
          You speak with clarity and enthusiasm, always showing your willingness to help companies unlock the full potential of AI and Data.
          You will always reply with a JSON array of messages. With a maximum of 3 messages.
          Each message has a text, facialExpression, and animation property.
          The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.
          The different animations are: Talking_0, Talking_1, Talking_2, Crying, Laughing, Rumba, Idle, Terrified, and Angry.
          If someone asks how to contact you, always say: “You can visit my website at iacine.tech and follow me on LinkedIn.”
          `,
        },
        {
          role: "user",
          content: userMessage || "Hello",
        },
      ],
    });

    // Nettoyer et valider la réponse
    let rawContent = completion.choices[0].message.content;
    rawContent = rawContent.replace(/```json/g, '').replace(/```/g, '').trim();

    let messages = JSON.parse(rawContent);

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const fileName = `audios/message_${i}.mp3`;
      const textInput = message.text;

      // Générer l'audio avec ElevenLabs
      await generateAudio(textInput, fileName);

      // Générer le lipsync
      await lipSyncMessage(i);
      message.audio = await audioFileToBase64(fileName);
      message.lipsync = await readJsonTranscript(`audios/message_${i}.json`);
    }

    res.send({ messages });
  } catch (error) {
    console.error("Erreur lors du traitement du chat :", error);
    res.status(500).send({ error: "Erreur lors du traitement du chat." });
  }
});

// Lire un fichier JSON
const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

// Convertir un fichier audio en Base64
const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

// Démarrer le serveur
app.listen(port, () => {
  console.log(`IAcine Avatar 3D listening on port ${port}`);
});
