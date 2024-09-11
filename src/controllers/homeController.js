require("dotenv").config();

let getHomePage = (req, res) => {
  return res.render("homepage.ejs");
};

let postWebhook = (req, res) => {
  let body = req.body;

  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = new entry.messaging[0]();
      console.log(webhook_event);
    });
    res.status(200).end("EVENT_RECEIVED");
  } else {
    res.status(404);
  }
};

let getWebhook = (req, res) => {
  let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
};

module.exports = {
  getHomePage,
  postWebhook,
  getWebhook,
};
// curl -X GET "localhost:8080/webhook?hub.verify_token=isJustRandomString&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe"
