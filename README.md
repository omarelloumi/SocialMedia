<h1 align="center">
🌐 MERN Stack Social Media Project
</h1>
<p align="center">
MongoDB, Expressjs, ReactJS/Redux, Nodejs
</p>

> MERN is a fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs.
MERN stack is the idea of using Javascript/Node for fullstack web development.

## clone or download
```terminal
$ git clone https://github.com/omarelloumi/SocialMedia.git
$ npm i
```

## project structure
```terminal
server/
   package.json
   .env (to create .env, set local server port and set database URI)
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install packages
$ npm run dev // run it locally
// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 5000)

### Prepare your port and database

run the script at the first level:

(You need to add a MONGO_URI and PORT in .env to connect to MongoDB)

```terminal
// in the root level
$ echo "PORT=5000" >> ./server/src/.env
$ echo "MONGO_URI =YOUR_Mongo_URI" >> ./server/src/.env
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run dev // run it locally
$ npm run build // this will build the server code to es5 js codes and generate a dist file
```

## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## BUGs or comments

[Create new Issues](https://github.com/omarelloumi/SocialMedia/issues) (preferred)

Email Me: omar.elloumi@esprit.tn (welcome, say hi)
