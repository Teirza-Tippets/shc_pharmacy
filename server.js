const express = require('express');
const app = express();
const path = require('path');
const { MongoClient } = require('mongodb'); // Fix MongoDB import
const infoRoutes = require('./src/routes/info');
const studentRoutes = require('./src/routes/student');
const medicationRoutes = require('./src/routes/medications');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const expressLayouts = require('express-ejs-layouts');

require('dotenv').config();

// MongoDB Connection
const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI, {
      serverApi: { version: '1', strict: true, deprecationErrors: true }
    });
    await client.connect();
    console.log("Connected to MongoDB");
    app.locals.db = client.db("pharmacyStudent"); // Store DB reference
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB();

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(expressLayouts);

//middleware
app.use(connectLiveReload());
app.use('/info', infoRoutes);
app.use('/student', studentRoutes);
app.use(medicationRoutes);

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
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
