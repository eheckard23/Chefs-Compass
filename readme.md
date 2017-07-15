# Table of Contents
* [Overview](#overview)
* [Installation](#installation)
* [Deployment Process](#deployment-process)
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

### Develop
Before you begin working on further updates to this project, you need to be starting your work from a *development* branch. Within the cloned project folder, run:

`git branch -b dev`

### Feature
While working on fixes and minor updates in development is best practice, any bigger, planned additions to the project should be expanded to a *feature* branch.

`git branch -b <NAME_OF_YOUR_FEATURE>`

Work on your updates in this branch, once 

### Release

### Production

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
