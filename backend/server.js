const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'India Global Scorecard Backend API' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to India Global Scorecard API',
    endpoints: [
      '/api/dashboard',
      '/api/categories',
      '/api/category/:id',
      '/api/countries',
      '/api/country/:name',
      '/api/compare?country=USA',
      '/api/search?q=gdp',
      '/api/ai-summary'
    ]
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Scorecard Backend Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
