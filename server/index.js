const express = require("express");
const cors = require("cors");
const webpush = require("web-push");

// Middlewares
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Constantes
const pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/cUq-M8Fs8DU:APA91bHIx212R3f7rgazZpoQ75Xys4QH_ZYUpDoPqoyOHg7SP0CB66vBwwkEFL1OtLlqNdUJJPhlA3wlLw_WuvvS1_ktHg8SdEmCSvy1Rv91NPRJN_Uv4Jz_cIgQezSsV6bRqFfOjofO',
    expirationTime: null,
    keys: {
      p256dh: 'BIU9EQ2m-r4NAWW7GOvmdyBF7xRLTEbFYmXA__nIpQthFcRLWzfsZ-DyKr94I8b_n6VtLDUcxlw1nB6Fb455DVY',
      auth: 'Pz1YsXnDkYNpNriOZkq13A'
    }
  }

  const vapidKeys = {
    publicKey: "BP8lzAKu8llo-coETIT_a2YTbROxEelltgjVjB9HUwUplvD3zYv13gezBpBzvkylxrqjTGk379vlGfrYhOR-Irs",
    privateKey: "lpO8hTJRa9WMbAsKf9SR-NK7vmFf3jKkSzkIowxhBx4",
  };

  webpush.setVapidDetails(
    'mailto:jonatan.c.ochoa@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// Routes 
app.get('/', async (req, res) => {
    res.sendStatus(200).json();
    const payload = JSON.stringify({title: 'Titulo de Notificación', message: 'Mensaje de la Notificacion'});
    try {
        await webpush.sendNotification(pushSubscription, payload);
        await res.send("Enviado");
    }   catch (e) {
        console.log(e)
    }
    
})

app.post('/subscription', (req, res) => {
    console.log(req.body);
    res.sendStatus(200).json();
    
})

app.listen(8000, () => console.log("Server listening in port 8000"))