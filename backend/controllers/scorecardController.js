const dataHelper = require('../utils/dataHelper');

exports.getDashboard = (req, res) => {
  try {
    const data = dataHelper.getDashboardSummary();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCategories = (req, res) => {
  try {
    const categories = dataHelper.getAllCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCategoryById = (req, res) => {
  try {
    const category = dataHelper.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCountries = (req, res) => {
  try {
    const countries = dataHelper.getCountriesList();
    res.json({ success: true, data: countries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCountryByName = (req, res) => {
  try {
    const profile = dataHelper.getCountryProfile(req.params.name);
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.compareCountry = (req, res) => {
  try {
    const targetCountry = req.query.country || 'USA';
    const comparison = dataHelper.getCountryComparison(targetCountry);
    res.json({ success: true, data: comparison });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.search = (req, res) => {
  try {
    const query = req.query.q || '';
    const searchResults = dataHelper.searchIndicators(query);
    res.json({ success: true, data: searchResults });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
