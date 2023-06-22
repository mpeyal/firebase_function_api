const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();

const app = express();

app.get("/", async (req, res) => {
  const snapshot = await admin.firestore().collection("fisheries1").get();
  let users = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    users.push({ id, ...data });
  });

  res.status(200).send(JSON.stringify(users));
});

app.get("/:id", async (req, res) => {
    const snapshot = await admin.firestore().collection('fisheries1').doc(req.params.id).get();

    const userId = snapshot.id;
    const userData = snapshot.data();

    //res.status(200).send(JSON.stringify({id: userId, ...userData}));
    res.status(200).send(JSON.stringify({...userData}));
})

app.post("/", async (req, res) => {
  const user = req.body;

  await admin.firestore().collection("fisheries1").add(user);

  res.status(201).send();
});

app.put("/:id", async (req, res) => {
    const body = req.body;

    await admin.firestore().collection('fisheries1').doc(req.params.id).update(body);

    res.status(200).send()
});

app.delete("/:id", async (req, res) => {
    await admin.firestore().collection("fisheries1").doc(req.params.id).delete();

    res.status(200).send();
})

exports.fisheries1 = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
//});
