import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const {https} = functions.region('us-central1');
const universal = require(`${process.cwd()}/dist/index`);

export const ssrServer = https.onRequest(universal.server);
