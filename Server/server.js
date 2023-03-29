// const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

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

// Define a function called getNewAuthToken that retrieves a new Twilio AUTH token
async function getNewAuthToken() {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  const token = await client.tokens.create();
  return token.iceServers;
}

// Define a function called updateAuthTokenInConfig that updates the Twilio AUTH token in the configuration
function updateAuthTokenInConfig(newToken) {
  process.env.TWILIO_AUTH_TOKEN = newToken;
}

// Call the getNewAuthToken function every hour and update the AUTH token in the configuration
setInterval(async () => {
  const newToken = await getNewAuthToken();
  updateAuthTokenInConfig(newToken);
  console.log("Twilio AUTH token updated");
}, 60 * 60 * 1000); // Run the function every hour (in milliseconds)

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
