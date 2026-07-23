const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

const CATEGORY_FILES = [
  'economy.json',
  'society.json',
  'governance.json',
  'education.json',
  'healthcare.json',
  'technology.json',
  'environment.json',
  'safety.json',
  'equality.json',
  'digital_government.json'
];

// Helper to calculate peer rank standing among tracked benchmark nations
function attachPeerMetrics(ind) {
  if (!ind || !ind.rankings || !Array.isArray(ind.rankings)) return ind;
  const sorted = [...ind.rankings].sort((a, b) => a.rank - b.rank);
  const indiaIdx = sorted.findIndex(r => r.country.toLowerCase() === 'india');
  const peer_rank = indiaIdx !== -1 ? indiaIdx + 1 : ind.india_rank;
  const peer_total = sorted.length;
  return {
    ...ind,
    peer_rank,
    peer_total
  };
}

// Helper to read and parse a JSON file safely
function readJsonFile(filename) {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const rawData = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(rawData);
    if (parsed && parsed.indicators && Array.isArray(parsed.indicators)) {
      parsed.indicators = parsed.indicators.map(attachPeerMetrics);
    }
    return parsed;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return null;
  }
}

// Load all category datasets
function getAllCategories() {
  return CATEGORY_FILES.map(file => readJsonFile(file)).filter(Boolean);
}

// Get Dashboard overview summary
function getDashboardSummary() {
  const categories = getAllCategories();
  let totalIndicators = 0;
  let rankSum = 0;
  const topHighlights = [];
  const categoryHighlights = [];

  categories.forEach(cat => {
    let catRankSum = 0;
    let catCount = 0;

    cat.indicators.forEach(ind => {
      totalIndicators++;
      rankSum += ind.india_rank;
      catRankSum += ind.india_rank;
      catCount++;

      // Highlights if India is top 10 or top 40
      if (ind.india_rank <= 40) {
        topHighlights.push({
          id: ind.id,
          name: ind.short_name || ind.name,
          category: cat.name,
          categoryId: cat.id,
          india_rank: ind.india_rank,
          peer_rank: ind.peer_rank,
          peer_total: ind.peer_total,
          total_countries: ind.total_countries,
          india_score: ind.india_score,
          unit: ind.unit,
          india_trend: ind.india_trend,
          india_rank_change: ind.india_rank_change,
          source: ind.source,
          source_url: ind.source_url,
          description: ind.description,
          rankings: ind.rankings,
          historical_data: ind.historical_data
        });
      }
    });

    categoryHighlights.push({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      indicatorCount: catCount,
      avgRank: Math.round(catRankSum / catCount),
      description: cat.description,
      ai_summary: cat.ai_summary
    });
  });

  topHighlights.sort((a, b) => a.india_rank - b.india_rank);

  return {
    hero: {
      overall_rank_score: Math.round(rankSum / totalIndicators),
      total_indicators: totalIndicators,
      categories_count: categories.length,
      top_rankings_count: topHighlights.filter(h => h.india_rank <= 10).length,
      gdp_rank: 5,
      hdi_rank: 134,
      innovation_rank: 39,
      healthcare_rank: 61,
      education_stem_rank: 2,
      digital_participation_rank: 24,
      climate_action_rank: 10
    },
    top_highlights: topHighlights,
    categories: categoryHighlights
  };
}

// Get specific Category data
function getCategoryById(categoryId) {
  const fileMap = {
    economy: 'economy.json',
    society: 'society.json',
    governance: 'governance.json',
    education: 'education.json',
    healthcare: 'healthcare.json',
    technology: 'technology.json',
    environment: 'environment.json',
    safety: 'safety.json',
    equality: 'equality.json',
    digital_government: 'digital_government.json'
  };

  const filename = fileMap[categoryId.toLowerCase()];
  if (!filename) return null;
  return readJsonFile(filename);
}

// Get list of benchmark countries
function getCountriesList() {
  return [
    { name: "India", code: "IN", flag: "🇮🇳", region: "South Asia" },
    { name: "USA", code: "US", flag: "🇺🇸", region: "North America" },
    { name: "China", code: "CN", flag: "🇨🇳", region: "East Asia" },
    { name: "Japan", code: "JP", flag: "🇯🇵", region: "East Asia" },
    { name: "Germany", code: "DE", flag: "🇩🇪", region: "Europe" },
    { name: "UK", code: "GB", flag: "🇬🇧", region: "Europe" },
    { name: "France", code: "FR", flag: "🇫🇷", region: "Europe" },
    { name: "Brazil", code: "BR", flag: "🇧🇷", region: "South America" },
    { name: "Canada", code: "CA", flag: "🇨🇦", region: "North America" },
    { name: "Australia", code: "AU", flag: "🇦🇺", region: "Oceania" },
    { name: "Russia", code: "RU", flag: "🇷🇺", region: "Eurasia" },
    { name: "South Korea", code: "KR", flag: "🇰🇷", region: "East Asia" },
    { name: "Bangladesh", code: "BD", flag: "🇧🇩", region: "South Asia" },
    { name: "Pakistan", code: "PK", flag: "🇵🇰", region: "South Asia" },
    { name: "Sri Lanka", code: "LK", flag: "🇱🇰", region: "South Asia" },
    { name: "Singapore", code: "SG", flag: "🇸🇬", region: "Southeast Asia" }
  ];
}

// Get Country profile
function getCountryProfile(countryName) {
  const categories = getAllCategories();
  const targetCountry = countryName.trim();
  const profileIndicators = [];

  categories.forEach(cat => {
    cat.indicators.forEach(ind => {
      const match = ind.rankings.find(r => r.country.toLowerCase() === targetCountry.toLowerCase());
      if (match) {
        profileIndicators.push({
          category: cat.name,
          categoryId: cat.id,
          indicatorId: ind.id,
          name: ind.short_name || ind.name,
          unit: ind.unit,
          higher_is_better: ind.higher_is_better,
          india_rank: ind.india_rank,
          india_score: ind.india_score,
          country_rank: match.rank,
          country_score: match.score,
          rank_difference: match.rank - ind.india_rank // positive means India ranks better (e.g. India #5 vs USA #1 -> -4)
        });
      }
    });
  });

  return {
    country: targetCountry,
    indicators_compared: profileIndicators.length,
    indicators: profileIndicators
  };
}

// Get Comparison between India and Target Country
function getCountryComparison(countryName) {
  const targetCountry = countryName.trim();
  const categories = getAllCategories();
  const categoryScores = [];
  const strengths = [];
  const weaknesses = [];

  categories.forEach(cat => {
    let indiaRankSum = 0;
    let targetRankSum = 0;
    let count = 0;

    cat.indicators.forEach(ind => {
      const match = ind.rankings.find(r => r.country.toLowerCase() === targetCountry.toLowerCase());
      if (match) {
        indiaRankSum += ind.india_rank;
        targetRankSum += match.rank;
        count++;

        const item = {
          category: cat.name,
          indicator: ind.short_name || ind.name,
          unit: ind.unit,
          india_rank: ind.india_rank,
          india_score: ind.india_score,
          target_rank: match.rank,
          target_score: match.score,
          source: ind.source
        };

        if (ind.india_rank < match.rank) {
          strengths.push(item);
        } else if (ind.india_rank > match.rank) {
          weaknesses.push(item);
        }
      }
    });

    if (count > 0) {
      categoryScores.push({
        categoryId: cat.id,
        categoryName: cat.name,
        indiaAvgRank: Math.round((indiaRankSum / count) * 10) / 10,
        targetAvgRank: Math.round((targetRankSum / count) * 10) / 10,
        // Normalized score 0-100 for radar chart (1 = 100, 100 = 20)
        indiaScore: Math.max(10, Math.round(100 - (indiaRankSum / count) * 0.7)),
        targetScore: Math.max(10, Math.round(100 - (targetRankSum / count) * 0.7))
      });
    }
  });

  return {
    targetCountry,
    categoryScores,
    strengths,
    weaknesses
  };
}

// Search across all indicators and categories
function searchIndicators(query) {
  if (!query || query.trim() === '') return { results: [] };
  const q = query.toLowerCase().trim();
  const categories = getAllCategories();
  const results = [];

  categories.forEach(cat => {
    if (cat.name.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q)) {
      results.push({
        type: 'category',
        id: cat.id,
        title: cat.name,
        description: cat.description,
        icon: cat.icon,
        url: `/category/${cat.id}`
      });
    }

    cat.indicators.forEach(ind => {
      if (
        ind.name.toLowerCase().includes(q) ||
        (ind.short_name && ind.short_name.toLowerCase().includes(q)) ||
        ind.description.toLowerCase().includes(q) ||
        ind.source.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'indicator',
          id: ind.id,
          title: ind.name,
          category: cat.name,
          categoryId: cat.id,
          description: ind.description,
          india_rank: ind.india_rank,
          total_countries: ind.total_countries,
          source: ind.source,
          url: `/indicator/${ind.id}`
        });
      }
    });
  });

  const countries = getCountriesList();
  countries.forEach(c => {
    if (c.name.toLowerCase().includes(q)) {
      results.push({
        type: 'country',
        id: c.name,
        title: `${c.flag} ${c.name}`,
        description: `Compare India with ${c.name} across global indicators`,
        url: `/compare?country=${encodeURIComponent(c.name)}`
      });
    }
  });

  return { query, count: results.length, results };
}

module.exports = {
  getAllCategories,
  getDashboardSummary,
  getCategoryById,
  getCountriesList,
  getCountryProfile,
  getCountryComparison,
  searchIndicators
};
