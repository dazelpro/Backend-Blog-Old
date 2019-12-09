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

const publicArticle     = require('./app-routes/routes-public/public-article');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// Route Login Tanpa Permission
app.use('/api-login', loginRoutes);

app.get('/', (req, res) => {
    res.sendFile('./app-assets/upload/', { root: __dirname });
});

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

// Gunakan Port 8080
const port = process.env.PORT || 8080
app.listen(port, ()=>{
    console.log('Server Running in Port : 8080');
});
// Tes Perubahan

module.exports=app;