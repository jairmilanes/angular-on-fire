import {https} from 'firebase-functions';
// import * as app from '../dist/index';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const universal = require(`${process.cwd()}/dist/index`);

console.log('universal', universal);

export const ssrServer = https.onRequest(universal.app);


