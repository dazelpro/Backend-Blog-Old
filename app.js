const express           = require('express');
const morgan            = require('morgan');
const bodyParser        = require('body-parser');
const cors              = require('cors');
const app               = express();
require('./app-config/passport');
const passport          = require('passport');
const passportLogin     = passport.authenticate('jwt', { session: false });

// Definisi Route
const loginRoutes       = require('./app-routes/route-login');
const accountRoutes     = require('./app-routes/route-account');
const categoryRoutes    = require('./app-routes/route-category');
const usersRoutes       = require('./app-routes/route-users');
const articleRoutes     = require('./app-routes/route-article');
const settingsRoutes    = require('./app-routes/route-settings');

const publicArticle     = require('./app-routes/routes-public/public-article');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(cors());
// app.use(express.static(__dirname + '/app-upload'));

// Route Login Tanpa Permission
app.use('/api-login', loginRoutes);

// Route Public
app.use('/api-public-article', publicArticle);

// Cek Json Web Token
app.use(passportLogin,(req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type','Authorization',' Accept');
    req.decoded = req.user;
    next();
});

// Route Cek Permission
app.use('/api-account', accountRoutes);
app.use('/api-category', categoryRoutes);
app.use('/api-users', usersRoutes);
app.use('/api-article', articleRoutes);
app.use('/api-settings', settingsRoutes);

// Gunakan Port 8080
const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log('D-12 Server Running in Port : 8080');
});

module.exports=app;