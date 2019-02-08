const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const envs = require('envs')('NODE_ENV');
const config = require('./config.json')[envs || 'dev'];
const routes = require('./routes');
const migration = require('./db/migration');

config.lib = {
    fs: require('fs'),
    request: require('request'),
    joi: require('joi'),
    path: require('path'),
    '_': require('lodash')
  }
  config.root = __dirname;

migration(config);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
routes(app, config);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))