const express = require('express');
const morgan = require('morgan');
var methodOverride = require('method-override');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;
const route = require('./routes/index');
const db = require('./config/db/');
const exp = require('constants');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));
// HTTP logger
/* app.use(morgan('combined')); */

// Template engine
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
