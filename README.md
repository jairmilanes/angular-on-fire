
# Angular On Fire
#### Base Angular, Firebase, Cypress and Jest project, it is set-up to be deployable to firebase hosting/functions with Server Side Rendering.  
  
![CircleCI](https://img.shields.io/circleci/build/github/layoutzweb/angular-on-fire/master?token=27358c4c9121c5d4f49943e679e2c6d30b31f8a2)
![CircleCI](https://img.shields.io/github/issues/layoutzweb/angular-on-fire)

  
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8 with some minor adjustments to make it compatible with Firebase Cloud Functions.  
  
  
## [Getting Started](#getting-started)  

Start by creating a new directory to host your files:
```bash
mkdir aof-project
cd aof-project
```
Now you got a couple of options to choose from:

#### [Download](#getting-started-download)
You can head to [Github's Angular On Fire](https://github.com/layoutzweb/angular-on-fire) repository, and download and unzip the project in the directory we created above.

#### [Clone](#getting-started-clone)
Clone Angular On Fire:  
```bash  
git clone https://github.com/layoutzweb/angular-on-fire.git .
```   
Remember to [change your remote url](https://help.github.com/en/articles/changing-a-remotes-url) to your own repository url before pushing your code.

### [Install dependencies](#getting-started-install)  
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
  
### [Run a dev server](#getting-started-dev-server)  
While developing locally, no server side rendering is needed, so run a development server using:      
```bash  
npm start
``` 
or alternatively `ng serve`. Navigate to `http://localhost:4200/` to see your app running.  

  
## [Firebase Integration](#firebase-integration)  
Angular On Fire is by default built to work with Firebase services, out of the box it uses:  
- **Hosting**: This is where the client application will be served from  
- **Cloud** Functions: Hosts our server application, allowing for server side rendered pages.

You can extend this integration with any Firebase service that meet your needs as you build your project.  

### [Creating a Firebase Project](#firebase-integration-create)
If you haven't done so, start by creating a Firebase account [here](https://firebase.google.com/ "Google Firebase"), and follow by creating a new Firebase project, here's a  [nice video tutorial](https://www.youtube.com/watch?v=6juww5Lmvgo "Creating your first project on Google Firebase") on how to do that to help you get started.

With your project created, login to Firebase in your console so you can have access to your cloud projects from your local machine:
```bash
firebase login
```
Follow the prompts to complete the authentication of your account.

### [Configure your active project](#firebase-integration-set-active)
To deploy or perform any action on your Firebase, we first must select a project, to do so use the Firebase cli use command:
```bash
firebase use --add
```
A list with your existing projects will be available on your console, select the name of your project in the list and press enter.

It will then ask you too give your project an alias, since this is the first project you are associating, enter `default` as the alias. The `default` alias is required if you are using Circle Ci for deployments.

This will add your project to the `.firebaserc` file under the `default` alias and will set it as the active project in the console, meaning running commands like `firebase deploy`, will deploy to the current active project.

Fore more info on the `use` command, checkout the Firebase cli reference page [here](https://firebase.google.com/docs/cli#add_a_project_alias).
  
### [Running the Firebase Emulator](#firebase-integration-emulator)  
Firebase cli provides a great way to test your builds locally before deployments in an environment that emulates the Firebase cloud environment. To do so run the following command from the root of the project:  
```bash  
npm run emulator
```  
This will serve your application in the Firebase dev emulator environment, which is the same as production but with source maps enabled. 
  
  
### [Deploying To Firebase](#firebase-integration-deploy-steps)  
Before you proceed here, make sure you have followed all the steps above to configure your default project, then follow the below steps:
  
#### [Build for production](#firebase-integration-build)  
```bash  
npm run build:ssr:prod
```  
This will perform a few steps:

* Build the Angular client application and place in `dist/browser`
* Build the Angular server application and place it in `dist/server`
* Build our SSR Express server and place in `dist/index.js`
* Copy the `dist` folder to `functions/dist` to be deployed in our SSR cloud function context   
  
#### [Deploy to Firebase](#firebase-integration-deploy)  
```bash  
firebase deploy
```  
This will deploy to Firebase Hosting and Cloud Functions, making your application available at your Firebase  
project url, which looks something like `https://[YOUR PROJECT ID].web.app` or your custom domain if you have already configured one.  


## [Circle CI Integration](#circle-ci-integration)
Circle CI is a widely used job runner, it's easy to manage, integrate and they offer a free account so you can get started right away.
This will require your project to be hosted on Github, the default Circle CI configuration can be found at `.circleci/config.yml`.

Follow the below steps to get started with automated deployments.

#### [Create a Circle CI account](#circle-ci-integration)
If you haven't done so, go ahead and get a Circle CI free account  [here](https://circleci.com/integrations/github/ "Github & Circle Ci Integration"), you can log in with your github account to make it even easier to configure.

#### [Link your Github Project](#circle-ci-integration-link-to-github)
Follow the steps to  [connect your Github account and link your project](https://circleci.com/docs/2.0/getting-started/#setting-up-your-build-on-circleci "Setting up your build on Circle Ci")  to Circle Ci.
Make sure to skip any project files configuration steps as everything is already configured for you, all you need to do is link your Github repo to Circle Ci.

#### [Configure your CI Firebase Token](#circle-ci-integration-firebase-token)
In order to build or deploy from a CI environment, you must obtain a Firebase CI token, to do so run the following command in your console:
```bash
firebase login:ci
```
A browser window will pop-up so you can authenticate your Firebase account, once that is done, look in the command line to find your newly generated CI token.

Head to your Circle CI dashboard, and create 2 new environment variables:
* FIREBASE_DEFAULT_PROJECT_ID Your production
* FIREBASE_CI_TOKEN
Copy the token string and create a new environment variable named `FIREBASE_CI_TOKEN`, with the generated token string as a value.
More info on [setting environment variables in Circle CI](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project).

#### [Push code to your master branch](#circle-ci-integration-push-code)
Now all it's left to do is pushing code to your master branch, the ci workflow will start automatically and you can follow their progress in your Circle CI dashboard.

#### [Notes](#circle-ci-integration-notes)
The goal of this integration was to get you up and running with CI easily, you will need to extend this configuration as 
your project evolves so we left for you to decide how to scale.


## [Release Automation](#release-automation)
Angular On Fire provides a Gulp task to help you automate your release process, it uses 
<a href="https://www.npmjs.com/package/conventional-changelog" target="_blank">Conventional Changelog</a> and 
<a href="https://www.npmjs.com/package/conventional-github-releaser" target="_blank">Conventional Github Releaser</a> 
along with other gulp helpers to:
* Bump your project version based on the release type (patch, minor, major, etc..)
* Update your change log with a new release
* Create a release tag based on the updated version
* Push th new release to Github

To perform a release make sure:
* your current branch is set to master
* commit and push any pending changes
* have a Github Personal Access Token in hand, you can create one [here](https://github.com/settings/tokens).

With the token in hands, run one of the pre-configured npm scripts:

```bash
npm run release:pre -- --token [YOUR GITHUB TOKEN]
```
For a pre-release version and tag (0.0.1-1).

```bash
npm run release:patch -- --token [YOUR GITHUB TOKEN]
```
For a patch version and tag (0.0.1).

```bash
npm run release:minor -- --token [YOUR GITHUB TOKEN]
```
For a minor version and tag (0.1.0).

```bash
npm run release:major -- --token [YOUR GITHUB TOKEN]
```
For a major version and tag (1.0.0).


## [Unit Tests](#unit-tests)  
Angular On Fire uses Jest to run unit tests, you can start your tests by running:      
```bash
npm run test
``` 
Visit [Jest](https://jestjs.io/docs/en/getting-started) documentation to learn more on how to create and run tests with Jets.
Visit the [Angular Testing Guide](https://angular.io/guide/testing) to lerna more about Angular tests.  
  
  
## [E2E Tests](#e2e-tests)  
E2e tests are managed by Cypress, to open the cypress console run:  
```bash
npm run e2e:open
```  
Visit [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress.html) site for more info on how to create e2e tests with Cypress.  
