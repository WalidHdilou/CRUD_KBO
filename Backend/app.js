const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const enterpriseRoutes = require('./routes/enterprise.routes');

const app = express();
app.use(cors());
app.use(express.json());

// test DB
sequelize.authenticate()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("DB connection error:", err));

app.use('/enterprises', enterpriseRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
