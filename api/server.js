const express = require('express');
const helmet = require('helmet');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const path = require('path');
const app = express();

// const routes = require('./routes');

const config = require('./server.config');

// const db = require('./db');
const User = require('./models/Users');

app.use(helmet());

// Express Route File Requires
const authAPI = require('./routes');
const db = require('./db');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  sessions({
    secret: 'bootcamp',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            // email not found
            return done(null, false);
          }

          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); // wrong password
            }

            return done(null, user); // success :D
          });
        })
        .catch(done); // done(err)
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

// Express Routing
app.use('/api', authAPI);
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });

db.sync({ force: false }).then(() => {
  app.listen(config.port, () => {
    console.log(`Server listening at port ${config.port}`);
  });
});
