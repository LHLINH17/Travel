const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

const port = 3030;

const route = require('./routes');
const db = require('./config/db');

// Connect to Db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
app.use(morgan('combined'));

//Template engine
// app.engine('handlebars', handlebars());
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
