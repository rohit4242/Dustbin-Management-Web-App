// const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Send SMS route
app.post("/sms", (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  const { to, msg } = req.body;
  console.log(to);
  console.log(msg);
  client.messages
    .create({
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: msg,
    })
    .then((message) => {
      res.send({ message: `SMS sent: ${message.sid}` });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
