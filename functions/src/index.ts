import * as functions from 'firebase-functions';
import {environment} from '../../src/environments/environment';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const {firebase} = environment;

if (!firebase.region || !(firebase.region in functions.SUPPORTED_REGIONS)) {
    throw new Error('The firebase region must be set in the base environment file.');
}

const region: any = firebase.region;
const {https} = functions.region(region);
const universal = require(`${process.cwd()}/dist/index`);

export const ssrServer = https.onRequest(universal.server);
