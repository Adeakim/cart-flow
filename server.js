const mongoose = require('mongoose');
const app = require('./app');

const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/cartDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
