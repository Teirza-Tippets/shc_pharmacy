const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Hardcoded test user (for testing)
const testUser = {
  id: '1',
  username: 'testuser',
  password: bcrypt.hashSync('testpassword', 10), // Hashed password
};

// Define Local Strategy
passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' }, // Ensure correct fields
  (username, password, done) => {
    if (username !== testUser.username) {
      return done(null, false, { message: 'Incorrect username' });
    }

    bcrypt.compare(password, testUser.password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false, { message: 'Incorrect password' });
      return done(null, testUser);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  if (id === testUser.id) {
    done(null, testUser);
  } else {
    done(new Error('User not found'));
  }
});

