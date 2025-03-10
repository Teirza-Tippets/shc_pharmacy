const express = require('express');
const app = express();
const path = require('path');
const infoRoutes = require('./src/routes/info');
const studentRoutes = require('./src/routes/student');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const expressLayouts = require('express-ejs-layouts'); 

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(expressLayouts);

//middleware
app.use(connectLiveReload());
app.use('/info', infoRoutes);
app.use('/student', studentRoutes);

// Default route for 
app.get('/', (req, res) => {
    res.render('info/welcome');
});

// Setup live reload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.watch(path.join(__dirname, 'src/views'));

// Trigger reload on changes
liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
