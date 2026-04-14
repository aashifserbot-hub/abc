const axios = require("axios");

module.exports = async (conn, m, text) => {
    const voice_id = "IC6fkbI5BN65xFmhUCbY";

    const res = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
        { text, model_id: "eleven_multilingual_v2" },
        {
            headers: {
                "xi-api-key": process.env.ELEVEN_API_KEY,
                "Content-Type": "application/json"
            },
            responseType: "arraybuffer"
        }
    );

    await conn.sendMessage(m.chat, {
        audio: Buffer.from(res.data),
        mimetype: "audio/mpeg",
        ptt: true
    });
};
