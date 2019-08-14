
# Angular On Fire
#### Base Angular, Firebase, Cypress and Jest project, it is set-up to be deployable to firebase hosting/functions with Server Side Rendering.  
  
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8 with some minor adjustments to make it compatible with Firebase Cloud Functions.  
  
  
## Getting Started  

Start by creating a new directory to host your files:
```bash
mkdir aof-project
cd aof-project
```
Now you got a couple of options to choose from:

#### Download
You can head to [Github's Angular On Fire](https://github.com/layoutzweb/angular-on-fire) repository, and download and unzip the project in the directory we created above.

#### Clone
Clone Angular On Fire:  
```bash  
git clone https://github.com/layoutzweb/angular-on-fire.git .
```   
Remember to [change your remote url](https://help.github.com/en/articles/changing-a-remotes-url) to your own repository url before pushing your code.

### Install dependencies  
To install all dependencies you must first run from the root:  
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
  
### Run the dev server  
While developing locally, no server side rendering is needed, so run a development server using:      
```bash  
npm start
``` 
or alternatively `ng serve`. Navigate to `http://localhost:4200/` to see your app running.  

  
## Firebase Integration  
Angular On Fire is by default built to work with Firebase services, out of the box it uses:  
- Hosting: This is where the client application will be served from  
- Cloud Functions: Hosts our server application, allowing for server side rendered pages.

You can extend this integration with any Firebase service that meet your needs as you build your project.  

### Creating a Firebase Project
If you haven't done so, start by creating a Firebase account [here](https://firebase.google.com/ "Google Firebase"), and follow by creating a new Firebase project, here's a  [nice video tutorial](https://www.youtube.com/watch?v=6juww5Lmvgo "Creating your first project on Google Firebase") on how to do that to help you get started.
With your project created, login to Firebase in your console so you can have access to your cloud projects from your local machine:
```bash
firebase login
```
Follow the prompts to complete the authentication of your account.

### Configure your active project
To deploy or perform any action on your Firebase, we first must select a project, to do so use the Firebase cli use command:
```bash
firebase use --add
```
A list with your existing projects will be available on your console, select the name of your project in the list and press enter.
It will then ask you too give your project an alias, since this is the first project you are associating, enter `default` as the alias.
This will add your project to the `.firebaserc` file under the `default` alias and will set it as the active project in the console, meaning running commands like `firebase deploy`, will deploy to the current active project.
Fore more info on the `use` command, checkout the Firebase cli reference page [here](https://firebase.google.com/docs/cli#add_a_project_alias).
  
### Running the Firebase Emulator  
Firebase cli provides a great way to test your builds locally before deployments in an environment that emulates the Firebase cloud environment. To do so run the following command from the root of the project:  
```bash  
npm run emulator
```  
This will serve your application in the Firebase dev emulator environment, which is the same as production but with source maps enabled. 
  
  
### Deploying To Firebase  
Before you proceed here, make sure you have followed all the steps above to configure your default project, then follow the below steps:
  
#### Build for production  
```bash  
npm run build:ssr:prod
```  
This will perform a few steps:
* Build the Angular client application and place in `dist/browser`
* Build the Angular server application and place it in `dist/server`
* Build our SSR Express server and place in `dist/index.js`
* Copy the `dist` folder to `functions/dist` to be deployed in our SSR cloud function context   
  
#### Deploy to Firebase  
```bash  
firebase deploy
```  
This will deploy to Firebase Hosting and Cloud Functions, making your application available at your Firebase  
project url, which looks something like `https://[YOUR PROJECT ID].web.app` or your custom domain if you have already configured one.  
  

## Unit Tests  
Angular On Fire uses Jest to run unit tests, you can start your tests by running:      
`npm run test` 
Visit [Jest](https://jestjs.io/docs/en/getting-started) documentation to learn more on how to create tests.  
  
  
## E2E Tests  
E2e tests are managed by Cypress, to open the cypress console run:  
`npm run e2e:open`  
Visit Cypress documentation site for more info on how to create e2e tests with Cypress.  

## Circle CI Integration
Circle CI is a widely used job runner, it's easy to manage, integrate and they offer a free account so you can get started right away.
This requires your project to be hosted on Github.
-   If you haven't done so, go ahead and get a Circle CI free account  [here](https://circleci.com/integrations/github/ "Github & Circle Ci Integration"), you can log in with your github account to make it even easier to configure.
-   Follow the steps to  [connect your Github account and link your project](https://circleci.com/docs/2.0/getting-started/#setting-up-your-build-on-circleci "Setting up your build on Circle Ci")  to Circle Ci.
-   Make sure to skip any project files configuration steps as everything is already configured for you, all you need to do is link your Github repo to Circle Ci.
-   Then just push code to your repository, a siple commit is enough to trigger your build.


  
## Further help  
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
