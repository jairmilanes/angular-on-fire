# Angular On Fire 
Base Angular, Firebase, Cypress and Jest project, it is set-up to be deployable to firebase hosting/functions with Server Side Rendering.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8 with some minor adjustments to make it compatible with Firebase Cloud Functions.


## Getting Started

### Clone Angular On Fire
Create a new directory if you haven't done so and clone Angular On Fire:
```bash
mkdir aof-project 
cd aof-project 
git clone https://github.com/layoutzweb/angular-on-fire.git .
``` 

### Install dependencies
To install all dependencies yous must first run from the root:
```bash
npm install
```

and also from the functions directory:
```bash
cd functions
npm install
```

Make sure to navigate back to root for next steps:
```bash
cd ../
```

### Run a dev server
While developing locally, no server side rendering is needed, so to run a development server use:    
```bash
npm start
``` 
or alternatively `ng serve`. Navigate to `http://localhost:4200/` to see your app running.



## Firebase Integration
Angular On FIre is by default built to work with Firebase services, out of the box it uses:
- Hosting: This is where the client application will be served from
- Cloud Functions: Hosts our server application, allowing for server side rendered pages 
You can extend this integration with any Firebase service that meet your needs.


### Running the Firebase Emulator
To run your project as if it had been deployed to Firebase, with hosting and cloud functions emulated 
by the firebase cli, run:
```bash
npm run emulator
```
This will serve your application in the Firebase dev emulator environment, which is the same as production but 
with source maps enabled.


### Deploying To Firebase
Assuming you have created and configured your Firebase project id, follow these steps:

#### Build for production
```bash
npm run build:ssr:prod 
```
This will build the application and server with pro

#### Deploy to Firebase
```bash
firebase deploy
```
This will deploy to Firebase Hosting and Cloud Functions, making your application available at your firebase url
project's url, which looks something like `https://[YOUR PROJECT ID].web.app` or your custom domain if you have 
configured one.


### Production Server
Serving a production version of the application is done using Firebase emulation, to do so run:   
```npm run serve```   
This will start the Firebase emulation server with your application running in the `ssrServer` cloud function.


### Build
Building the project requires 2 steps:
- `npm run build:ssr` Build the main application.
- `cd functions && npm run build && cd ../` Navigates to the functions directory, build and navigates back to root.
From here you can either serve the production version of your app or deploy to firebase.


### Deploy
Angular On Fire uses Firebase Hosting, to deploy run the firebase cli command:    
```firebase deploy```     
After the deploy completes you can either visit your custom configured domain or your firebase hosting app url to view 
your application live, which would look something like `https://icm-<YOUR PROJECT ID>.web.app`.


### Unit Tests
Angular On Fire uses Jest to run unit tests:    
`npm run test`     
Visit [Jest](https://jestjs.io/docs/en/getting-started) documentation to learn more on how to create tests.


### E2E Tests
E2e tests are managed by Cypress, to open the cypress console run:
`npm run e2e:open`
Visit Cypress documentation site for more info on how to create e2e tests with Cypress.


### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
