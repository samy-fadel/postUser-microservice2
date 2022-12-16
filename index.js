const express = require('express');
const app = express();
const port = 80;
var cors = require('cors');
app.use(cors());
app.options('*', cors());
app.use(require('body-parser').json());

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp({
  credential: applicationDefault()
});


const db = getFirestore();


app.get('/readiness', (req, res) => {
    res.send('<h1>pod container is ready!</h1>');
 });


 app.post('/microservice2', (req,res) => {

  console.log(req.body);

    let user = req.body;
    const docRef = db.collection('users').doc();
    const postDoc = async () => {
        await docRef.set(user);
      }
    postDoc().then(res.send("bravo"))

});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});