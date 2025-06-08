import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { hofiPushMessage } from '../data/inbox.js';

dotenv.config();

const app = express();
const PORT = 3000;
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

app.use(bodyParser.json());

// Webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified');
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// Message handler
app.post('/webhook', (req, res) => {
  console.log("🔥 POST /webhook hit");
console.log("📥 Raw payload:", JSON.stringify(body, null, 2));
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach((entry) => {
      const event = entry.messaging?.[0];
      const msg = event?.message?.text;
      const senderId = event?.sender?.id;

      if (msg) {
        hofiPushMessage({
          platform: 'facebook',
          senderId,
          text: msg,
          timestamp: entry.time
        });
        console.log(`📨 ${senderId}: ${msg}`);
      }
    });

    return res.sendStatus(200);
  }

  return res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook server listening at http://localhost:${PORT}`);
});