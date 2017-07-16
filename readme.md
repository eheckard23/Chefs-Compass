# Table of Contents
* [Overview](#overview)
* [Installation](#installation)
* [Deployment Process](#deployment-process)
* [Versioning](#versioning)
* [Continuous Integration](#continuous-integration)

## Overview
This guide will go over the process of installing this application onto your local machine to deploying to a live production server.

## Installation
Begin by forking this repository to make changes.

![image](https://user-images.githubusercontent.com/17580530/28235659-5b816a04-68e0-11e7-8d86-36e8603c1878.png)

Then be sure to clone your repository down to a folder on your local computer. 

![image](https://user-images.githubusercontent.com/17580530/28235676-b620cba8-68e0-11e7-9703-54cb36ee0408.png)

Now that you have the project on your machine, `cd` into your project folder and run `npm i` to install all of the dependencies.

## Deployment Process
In order to go through the deployment process properly, follow this branching model:

***When you are ready to push up your changes to the repo, follow [this guide](#versioning) below for creating proper versioning to your work.***

### Develop
Before you begin working on further updates to this project, you need to be starting your work from a **development** branch. Within the cloned project folder, run:

`git branch -b dev`

### Feature
While working on fixes and minor updates in **development** is best practice, any bigger, planned additions to the project should be expanded to a **feature** branch.

`git branch -b <NAME_OF_YOUR_FEATURE>`

Work on your updates in this branch, once a new feature has been completed and works as planned, `push` those changes to your **feature** branch.

***`Merge` all work back into dev branch when finished with feature***

### Release
When a new feature(s) has been added to the **dev** branch and is working as planned, it is time to add these changes into a **release** branch using whatever the current version of the project is on, for example...

`git branch -b <release-v1.2.5>`

The main focus of the release branch is to stage the new version of the project on a server that looks as identical to a live server as possible. For this project, you will create a stage/production pipeline through [Heroku](https://www.heroku.com/
)

#### Log in to your Heroku account and begin by creating a new app

![image](https://user-images.githubusercontent.com/17580530/28242122-8ef3938a-6971-11e7-9528-1e337003bffb.png)

This will be your staging server so name your app following this convention:

`YOUR-APP-NAME-stage`

#### Go back to your Personal Apps and create a second app
This will be your production server, name it following:

`YOUR-APP-NAME-prod`

#### Create a pipeline
![image](https://user-images.githubusercontent.com/17580530/28242149-874c73bc-6972-11e7-819b-0f6632c1ab1d.png)

You can name the pipeline however you like, if you followed the naming convention for the stage/production apps, you can name the pipeline after the app itself:

`YOUR-APP-NAME`

Make sure you add the 2 different applications correctly in the pipeline dashboard.

![image](https://user-images.githubusercontent.com/17580530/28242185-3d68b9ee-6973-11e7-9f38-c1b7cb22eca6.png)

#### Connect to your GitHub repository
Connect your staging application to your GitHub account. You should be able to search and add the specific repository as well.

![image](https://user-images.githubusercontent.com/17580530/28242204-81421cdc-6973-11e7-9058-c873637e1d40.png)

#### Auto Deployment
Once your repository is added, enable auto deployment **from your release branch**. If you have tests running through Codeship ([follow this guide](#continuous-integration)), you should check the box asking to wait for CI to pass before it deploys to the server.

> If you don't see your release branch listed in the options, you may need to `push` that branch up to the repository.

![image](https://user-images.githubusercontent.com/17580530/28249627-4731d28a-6a27-11e7-9484-97dd9a121159.png)

#### Manual Deploy
Initially, you can choose to run a manual deploy to avoid having to re-`push` your release branch up.

![image](https://user-images.githubusercontent.com/17580530/28249673-492c0226-6a28-11e7-8d01-00669282028f.png)

If it passes Codeship, you should be able to see the build process on Heroku. If successful, you can open the app up and see it running live on a staging server. 


### Production
If all the necessary changes or fixes to the **release** branch are made and the project is ready for production, Heroku allows you to very easily promote your staging app to the production server.

![image](https://user-images.githubusercontent.com/17580530/28249712-145291d6-6a29-11e7-8ce7-09a340fdb84e.png)

Simply click the **Promote to prodcution** button and Heroku will deploy your staging application to a live, production server. You should now have 2 separate links to see the staging application and production application running in the browser.

## Versioning
At any point in your work you are going to be making changes big or small to the project. It is important to use the following commands whenever you've made these changes, which are categorized in 3 ways:

> Included in the project is a **gulpfile.js** that has a `bump` task for updating the project version, as well as running a `git tag` with that specific version. After you have pushed your changes to the repo, use the commands below that correspond to the type of version you are working on.

### Major
When your work functions as planned, but has enough changes to the point that an earlier version does not work the same, this is considered a major release.

`gulp bump --v=0`

### Minor
When your work functions as planned, but has only improved on smaller areas of the code that do not alter the overall structure of the project, this is considered to be a minor release. An earlier version should still work along side this the same way, with some smaller improvements.

`gulp bump --v=1`

### Patch
When your work has an unexpected bug that needs to be updated and fixed quickly, this is considered to be a patch release.

`gulp bump --v=2`

## Continuous Integration
This part of the deployment model is not required but is recommended for ensuring that your code passes any necessary tests before pushing to further stages. If you choose to add this part, begin by visiting and signing up with [Codeship](https://codeship.com/)

[![button](https://user-images.githubusercontent.com/17580530/28239316-adb932e6-6937-11e7-9cdf-f7b17af27091.png)]
(https://codeship.com/)

A service like Codeship allows you to add and listen for pushes to an existing repository. When you push any commits, Codeship will download a copy of your repo and run any commands you provide, including tests.
#### Sign in using your GitHub account.
![image](https://user-images.githubusercontent.com/17580530/28239348-739a90e0-6938-11e7-8564-e0d456d36506.png)
#### Create a new project using GitHub
![image](https://user-images.githubusercontent.com/17580530/28239363-b7dde784-6938-11e7-8ee9-f9b8a2ccb5fd.png)
#### Copy and paste your repository's clone URL and hit Connect
![image](https://user-images.githubusercontent.com/17580530/28239368-c9d0dd2a-6938-11e7-8a31-110ec4360485.png)
#### Select the Basic plan and you should now be able to add your commands
I won't go into detail how extensive these commands can be, but in my simple case of making sure that my Mocha tests are passing, my commands would look like this...

##### Setup Commands
These commands are run before Codeship will run any designated tests.

***Be sure to substitute whichever version of Node your project is currently using where it says 6.9.4. You can check for the version by running `node -v` in your project folder.***

![image](https://user-images.githubusercontent.com/17580530/28239463-c5344aca-693a-11e7-987a-8054155f2c2c.png)
##### Test Commands
These commands are where you can specify which tests you want Codeship to actually run. In my case I want **all** mocha tests in my *test* folder to run:
![image](https://user-images.githubusercontent.com/17580530/28239514-e35a9044-693b-11e7-91fa-17619dfd35c9.png)

Once you're done with that, you should be able to start pushing to your repository and seeing the tests run in Codeship at the same time.
