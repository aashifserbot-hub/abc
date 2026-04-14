const vc = require("./vc");

module.exports = (conn) => {
    conn.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];

        if (!msg.message) return;

        const body =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text;

        if (!body) return;

        if (body.startsWith(".vc")) {
            let text = body.slice(3).trim();
            vc(conn, msg, text);
        }
    });
};
