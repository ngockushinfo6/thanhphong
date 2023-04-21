const express = require('express');
require('dotenv').config();
const http = require("http");
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const view = require('./routers/view');
const moment = require('moment');
app.locals.moment = moment;

app.use(session({
    secret: process.env.SESSION_SECRET,
    name: '_session',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(view);
server.listen(process.env.PORT, () => {
    console.log(`Server đang lắng nghe trên cổng ${process.env.PORT}`);
});