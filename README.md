<h1 align='center'>Express JS - Chat.us</h1>
  <p align="center">
    <a href="https://chatuss.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/Cotllinz/ChatUs-BackEnd/issues">Report Bug</a>
    ·
    <a href="https://github.com/Cotllinz/ChatUs-BackEnd/pulls">Request Feature</a>
  </p>

![Image Banner](https://raw.githubusercontent.com/Cotllinz/ChatUs-FrontEnd/master/smartmockups_klg56n1d.jpg)

## About The Project

Chat Us is a website realtime that made for chating with other people maybe your friend or your family with automatic update location in this apps
this website build with tools etc. Vue, Express,js Mysql, Node.js.

[More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name anya_coffee, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/8217070/TW6upoyH)

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
HOST=127.0.0.1 // Database host
USER=root // Database username
PASS=  // Database Password
DATABASE=chatus_database // Database name
PORT=3000 // My Using PORT
code_secretJWT // Secret Code JWT
email = test@gmail.com // email for nodemailer
emailpassword= test // password email for nodemailer
```

## License

© [Rudy Galih Putra Wijaya](https://github.com/Cotllinz/)
