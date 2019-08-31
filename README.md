


![alt text](https://cdn.jsdelivr.net/gh/layoutzweb/angular-on-fire@master/src/assets/github-logo.png "Angular On Fire")
  
#### Angular On Fire is more than your average starter project, Angular On Fire gives you a whole development environment with everything you need and minimal configuration.  

Angular On Fire puts the best tools on the market into one package, Angular 8 Universal (SSR), RXJS, Firebase, Circle CI, Cypress and Jest, all pre-configured and fully compatible with  [Angular CLI](https://github.com/angular/angular-cli),  so you can get your projects running in no time.

![Issues](https://img.shields.io/github/package-json/v/layoutzweb/angular-on-fire)
![Issues](https://img.shields.io/github/issues/layoutzweb/angular-on-fire)
![CircleCI](https://img.shields.io/circleci/build/github/layoutzweb/angular-on-fire/master?token=27358c4c9121c5d4f49943e679e2c6d30b31f8a2)
![Issues](https://img.shields.io/github/license/layoutzweb/angular-on-fire)
  
  
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
- **Cloud Functions**: Hosts our server application, allowing for server side rendered pages.
You can extend this integration with any Firebase service that meet your needs as you build your project.  

### [Creating a Firebase Project](#firebase-integration-create)
If you haven't done so, start by creating a Firebase account [here](https://firebase.google.com/ "Google Firebase"), and follow by creating a new Firebase project, here's a  [nice video tutorial](https://www.youtube.com/watch?v=6juww5Lmvgo "Creating your first project on Google Firebase") on how to do that to help you get started.

With your project created, login to Firebase in your console so you can have access to your cloud projects from your local machine:
```bash
firebase login
```
Follow the prompts to complete the authentication of your account.
If you plan on [integrating with Circle Ci](#circle-ci-integration) using the default configuration, you will need an extra Firebase project to host your staging application, if so, go ahead and repeat the steps above to create your staging project.

### [Configure your active project](#firebase-integration-set-active)

To deploy or perform any action on your Firebase, you first must select a project, if you haven't done so, use the Firebase cli command to set it:
```bash
firebase use --add
```
A list with your existing projects will be available on your console, select the name of your project in the list and press enter.

It will then ask you too give your project an alias, since this is the first project you are associating, enter `default` as the alias.

This will add your project to the `.firebaserc` file under the `default` alias and will set it as the active project in the console, this is done so you don't have to pass `--project` parameter to Firebase commands.

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

You can also build with the `build:ssr:staging` command, which will build your project using the staging environment configuration.


#### [Manual Deployment](#firebase-integration-deploy)  
```bash  
firebase deploy
```  
This will deploy to Firebase Hosting and Cloud Functions, making your application available at your Firebase  
project url, which looks something like `https://[YOUR PROJECT ID].web.app` or your custom domain if you have already configured one.  

#### [Automated Deployment](#firebase-ci-deploy)
Angular On Fire comes with a default CI pipeline configuration that takes care of deploying to production or staging depending on the tag or branch being merge in. [Learn more on how to get your project setup with Circle CI for automated builds and deployment](#circle-ci-integration).


## [Release Automation](#release-automation)
Angular On Fire provides a Gulp task to help you automate your release process, it uses 
<a href="https://www.npmjs.com/package/conventional-changelog" target="_blank">Conventional Changelog</a> and 
<a href="https://www.npmjs.com/package/conventional-github-releaser" target="_blank">Conventional Github Releaser</a> 
along with other gulp helpers to:
* Bump your project version based on the release type (patch, minor, major, etc..)
* Update your change log with a new release
* Create a release tag based on the updated version
* Push the new release to Github

To perform a release make sure:
* your current branch is set to **master**
* commit and push any pending changes
* have a **Github Personal Access Token** in hand, you can create one [here](https://github.com/settings/tokens).

With the token in ready, run one of the available npm scripts:

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



## [Circle CI Integration](#circle-ci-integration)
Circle CI is a widely used job runner, it's easy to manage, integrate and they offer a free account so you can get started right away. This will require your project to be hosted on Github, the default Circle CI configuration can be found at `.circleci/config.yml`.

Follow the below steps to get started with automated deployments.

#### [Create a Circle CI account](#circle-ci-integration)
If you haven't done so, go ahead and get a Circle CI free account  [here](https://circleci.com/integrations/github/ "Github & Circle Ci Integration"), you can log in with your github account to make it even easier to configure.

#### [Link your Github Project](#circle-ci-integration-link-to-github)
Follow the steps to  [connect your Github account and link your project](https://circleci.com/docs/2.0/getting-started/#setting-up-your-build-on-circleci "Setting up your build on Circle Ci")  to Circle Ci.

#### [Configure your CI Firebase Token](#circle-ci-integration-firebase-token)
In order to build or deploy from a CI environment, you must obtain a Firebase CI token, to do so run the following command in your console:
```bash
firebase login:ci
```
A browser window will pop-up so you can authenticate your Firebase account, once that is done, look in the command line to find your newly generated CI token, keep it open for the next step or save it locally, just don't commit it to your repo.

Head to your Circle CI dashboard, and create the following  environment variables:
* **FIREBASE_PROD_PROJECT_ID**: Your production app id
* **FIREBASE_STAGING_PROJECT_ID**: Your staging app id
* **FIREBASE_CI_TOKEN**: The token generated in the previous step

Learn more on [setting environment variables in Circle CI](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project).

### [Branch Strategy](#branch-strategy)
Angular On Fire assumes that at least 2 branches should exist from the start:

* **master**: This will be your production, it's where everything that been tested and is ready to be shipped end's up
* **next**: This is where all your new features will build up to a new release

#### [Branch Naming](#branch-naming)
You should never push code stray to either `master` or `next`, code should only be merged in via pull requests from branches purposefully created to improve or solve a problem. 

This is not required by Angular On Fire, but one common pattern and the one we use for our projects, is to set branch names with prefixes that indicates what that branch is about. For that we can borrow from Angular commit patterns recommendations to create a organized naming strategy:

* `build/*` Changes that affect the build system or external dependencies
* `ci/*` Changes to CI configuration files and scripts
* `docs/*` Documentation only changes
* `feat/*` A new feature
* `fix/*` A bug fix
* `perf/*` A code change that improves performance
* `refactor/*` A code change that neither fixes a bug nor adds a feature
* `style/*` Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* `test/*` Adding missing tests or correcting existing tests

This makes your repository conveniently easy to understand.


#### [Branch Protection Rules](#branch-protection-rules)
Another important step specially when working in teams, is branch protection, you can set rules for branches so pull requests can only be merged if they satisfy your rules.

To get started, head over to your Github repository then click Settings/Branches.   
![Github Branch Settings Page](https://i.imgur.com/PZcmFid.jpg)

Create a rule for each of your main branches like the image above, and for each of them consider the following options:
**Require pull request reviews before merging**
This is only needed if you are working in teams.
**Require status checks to pass before merging**
If you are integrating the Ci workflow, this is needed to make sure code being merged to one of this branches is only allowed if the status checks passes, you can read more about it [here](https://help.github.com/en/articles/configuring-protected-branches).
To start set your required status checks for both branches as following:
* ci/circleci: preload
* ci/circleci: lint
* ci/circleci: build
* ci/circleci: test

This will make sure that any branch being merged to either `master` or `next` pass tests before they are allowed to be merged.

### [Workflow](#workflow)
Angular On Fire comes with a general workflow in mind, the following steps assumes the following:
 * You have already cloned/downloaded the project, install dependencies and you are ready to start coding:
* You have configured your branches as suggested in the [Branch Protection Rules](#branch-protection-rules) step.
* The CI pipelines are only triggered if you have configured your Circle CI/Github integration.

With the above completed, think of your development cycle in 2 phases:
#### The development phase
* Create a branch from `next` following the [Branch Naming](#branch-naming) recommendations, eg: `feat/my-feature-branch`
* Commit changes to this branch until you are ready to merge
* Create a pull-request to `next` (not `master`)
	* If you have configured Circle CI, this should trigger a build/test workflow 
	* Do PR reviews here
* Merge PR into `next`
	* This will trigger a deploy to your Firebase staging app
	* QA team members can validate new features here and approve or not approve a deploy

Repeat the above for every change you want to include in the next release.

#### The deployment phase
Once all changes are merged into `next` it's time to create a release and push the new code to production:
* Create a pull request from `next` to `master`
	* This will also trigger build/test workflow but no deploys
* Merge the PR into `master`
* Create a release which will create a new tag
	* This will trigger the production deployment pipeline
	* Visit your production url to see your updated application 







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


## LICENSE
All assets and code are under the [The Unlicense](https://github.com/layoutsweb/angular-on-fire/blob/master/LICENSE) and in the public domain unless specified otherwise.

This project is in no way associated with Angular. The assets in src/assets/ are trademarks of their respective companies and are under their terms and license.


