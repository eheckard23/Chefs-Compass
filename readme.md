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

#### Develop
Before you begin working on further updates to this project, you need to be starting your work from a *development* branch. Within the cloned project folder, run:

`git branch -b dev`

#### Feature
While working on fixes and minor updates in development is best practice, any bigger, planned additions to the project should be expanded to a *feature* branch.

`git branch -b <name_of_your_feature>`

Work on your updates in this branch, once 

#### Release

#### Production
