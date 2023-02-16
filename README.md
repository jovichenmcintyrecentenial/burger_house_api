## Project Overview

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

## VSCode extensions

For this project you are advised to install the following plugin to help with the overall development experience, and also we are working on one project so a linter will help us to keep our coding standard as uniform as possible
### 1. npm Intellisense  
This is a VSCode extension that autocompletes npm modules in import statements. Find it [here](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense).

### 2. ESLint
ESLint is one of the most popular extensions among developers and it is developed by Microsoft. It checks your code for syntax errors and highlights errors to make sure you can quickly find and fix them. Find it [here](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense).

## Guildlines

### Git Branching
Because this project is a distributed effort this there will be restriction on the project's master branch. Why is this you may ask. Well this ensure that our code are reviewed and unto a certain standard before it is merge in the master branch and this is real work practice who haven't gotten the experience as yet.

#### Creating New Branches
For this project you can we will restricted to two types of branch type there are as follows:
1. **feature** is use when implementing a new functionality for the api
2. **bug-fix** is when your fixing a bug

#### Examples
feature 
```bash
 git checkout master
```
```bash
 git checkout -b feature/add-jwt-authenication
```
bug-fix
```bash
 git checkout master
```
```bash
 git checkout -b bug-fix/crash-on-login
```
### Folder Structure
```
 .
├── controllers               #contains business logic for routes
├── middlewares               # functions that are used before or after processing a route eg. for route gaurding
├── routes                    # api route will be define here with respective controllers
├── models                    # model definition should go here, espically when using mongoDB
├── utils                     # helpful function and files
├── package.json              # project dependencies
├── .env                      # files to store environment varible such ask base_url and port for server
└── app.js

```