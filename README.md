# Angular On Fire 
Base Angular, Firebase, Cypress and Jest project, it is set-up to be deployable to firebase hosting/functions with Server Side Rendering.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8 with some minor adjustments to make it compatible with Firebase Cloud Functions.


## Development server
While developing locally no server side rendering is needed, so to run a development server use:    
`npm run start`    
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Production Build
Building the project requires 2 steps:
- `npm run build:ssr` Build the main application.
- `cd functions && npm run build && cd ../` Navigates to the functions directory, build and navigates back to root.
From here you can either serve the production version of your app or deploy to firebase.


## Production Server
Serving a production version of the application is done using Firebase emulation, to do so run:   
```npm run serve```   
This will start the Firebase emulation server with your application running in the `ssrServer` cloud function.


## Deploying to Firebase
To deploy run the firebase cli command:
```firebase deploy```     
The project is set-up in a way that it won't delete ohter existing cloud functions, but only update the `ssrServer` 
function in case you have other functions configured for other projects.

After the deploy completes you can either visit your custom configured domain or your firebase hosting app url to view 
your application live, which would look something like `https://icm-<YOUR PROJECT ID>.web.app`.

## Running unit tests
Angular On Fire uses Jest to run unit tests, to do so run:    
`npm run test`     
Visit [Jest](https://jestjs.io/docs/en/getting-started) documentation to learn more on how to create tests.

## Running end-to-end tests
E2e tests are managed by Cypress, to open the cypress console run:
`npm run e2e:open`
Visit Cypress documentation site for more info on how to create e2e tests with Cypress.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
