const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { passport } = require('./middleware');
const { db } = require('./config');
const routes = require('./api');


const env = process.env.NODE_ENV || 'dev';
const PORT = 3000;

const app = express();

mongoose.connect(
	db[env],
	{ useNewUrlParser: true },
);

const dataBase = mongoose.connection;
mongoose.Promise = global.Promise;

dataBase.on('error', console.error.bind(console, 'db error'));
dataBase.once('open', () => console.log('db connected'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/api', routes);

const server = app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
