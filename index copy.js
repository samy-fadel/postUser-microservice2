const express = require('express');
const app = express();
const port = 80;
const Firestore = require('@google-cloud/firestore');
//var cors = require('cors');
//app.options('*', cors());
app.use(require('body-parser').json()); //ok

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp({
  credential: applicationDefault()
});

const db = getFirestore();

/* var whitelist = ['http://34.160.109.71:80', 'http://34.160.109.71:3000', 'http://34.160.109.71/microservice2', 'http://34.160.109.71/microservice1', 'http://34.160.51.212:80', 'http://34.160.51.212:80/readiness', 'http://10.63.0.141:80/readiness', 'http://10.63.0.141:80']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
} */

/* const db = new Firestore({
  projectId: 'gkemedium',
  keyFilename: '/Users/samyfadel/Downloads/gkemedium-1d285a7a4755.json',
}); */



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