# Seecret🤫

[![version](https://img.shields.io/badge/version-v1.0-6EB8D0)](https://github.com/valentinsilvera/seecret)
[![URL](https://img.shields.io/badge/URL-https://seecret.netlify.app/-blueviolet)](https://seecret.netlify.app/)
[![URL](https://img.shields.io/github/languages/top/valentinsilvera/seecret)](https://github.com/valentinsilvera/seecret/search?l=javascript)

This repository contains two components:
* the **frontend**, which provides a client to share and read seecrets ([Deployed on Netlify](https://seecret.netlify.app))
* the **backend**, which provides the API to create users, and read, like, and comment posts ([Deployed on Heroku](https://seecret.herokuapp.com))

This document aims to give an overview about the 
techstack, code structure and API documentation. 
In addition, the reader gets to know how to install and setup a local development environment.

## Frontend 

### Techstack 
The client for Seecret is written in:
- [React](https://github.com/facebook/react)
- [JavaScript](https://www.javascript.com)

Design system library:
- [SemanticUI](https://github.com/Semantic-Org/Semantic-UI)

### Installation
Note: you need to [install npm](https://nodejs.org/en/download/package-manager/#macos) to be able to build and run the website.

To run Seecret locally you can:
```zsh
git clone https://github.com/valentinsilvera/seecret.git
cd ./seecret/client
npm install
npm start
```

## Backend

### Techstack
To realize authentication, authorization, secure elections, and vote casting, we built the backend service with the following technologies:
- [NodeJS](https://nodejs.org/en/)
- [GraphQL](https://graphql.org)
- [Apollo Server] (https://www.apollographql.com)
- [JWT](https://jwt.io/)

### Code Structure
The backend consists of:
- `index.js`: Handles server startup
- `config.js`: Not commited, this is where the database secrets are. Instructions on how to create it are at in the *Installation* section down below
- `package.json`: Includes node modules and scripts
- `graphql`:
    - `typeDefs.js`: Definition of the types used in the database
    - `resolvers`: Directory containing GraphQL query handlers
- `models`: Directory containing GraphQL schemas for the Post and User
    - `email`: Definition of email services, such as the VoteTokenEmail
    - `management`: Management commands and logging utilities
- `utils`: Directory containing supporting code
    - `checkAuth.js`: Checks if a user is logged in and stores de JWT
    - `validators.js`: Validators for GraphQL mutations
    
<img width="1264" alt="schema" src="https://user-images.githubusercontent.com/40093903/149775167-d5bb4ff3-fbe6-48fa-be6a-4ac28ad72f09.png">


### API Documentation

#### Installation
Requirements:
* [npm](https://docs.npmjs.com/cli/v8/commands/npm)

If you haven't installed the node packages yet, you can do so by running:
```zsh
npm install
```

In order to establish a connection with the server you need to provide credentials. For this you need to create `/config.js` and replace both strings with the ones submitted on the module submission form:

```javascript
module.exports = {
  MONGODB: 'url string goes here',
  SECRET_KEY: 'secretkey string goes here'
};
```

After the credentials are in place you can run:
```zsh
npm start
```
Finally, you can access the [Atlas interactive window](https://localhost:8000) and create queries and mutations there. For mutations you need to provide a token which can be obtained after creating/loging a user.

### Author
- Valentin Silvera - [@ValentinSilvera](https://github.com/valentinsilvera)
