import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";

const router = express.Router();

// Endpoint simple de TTS usando Google TTS API
router.get("/tts", async (req, res) => {
  const { lang, text } = req.query;

  try {
    const response = await axios({
      method: "GET",
      url: `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_KEY}`,
      data: {
        input: { text },
        voice: { languageCode: lang === "Japanese" ? "ja-JP" : lang === "Spanish" ? "es-ES" : "en-US" },
        audioConfig: { audioEncoding: "MP3" }
      }
    });
    const audioContent = Buffer.from(response.data.audioContent, "base64");
    res.set("Content-Type", "audio/mpeg");
    res.send(audioContent);
  } catch (err) {
    console.error(err);
    res.status(500).send("TTS Error");
  }
});

export default router;
