const dotenv = require('dotenv');
dotenv.config();

exports.generateSummary = async (req, res) => {
  try {
    const { indicatorName, categoryName, indiaRank, totalCountries, indiaScore, unit, compareCountry } = req.body;

    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are a senior economic policy and global development analyst. Explain global indicator rankings clearly, professionally, and concisely under 150 words.'
              },
              {
                role: 'user',
                content: `Explain India's ranking for ${indicatorName || 'Global Indicators'} (${categoryName ? 'Category: ' + categoryName : ''}). India Ranks ${indiaRank || 'N/A'} out of ${totalCountries || 195} with score ${indiaScore || ''} ${unit || ''}. Mention key strengths, weaknesses, and 2 actionable policy improvements. Keep strict 150 word limit.`
              }
            ],
            max_tokens: 250
          })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
          return res.json({
            success: true,
            source: 'openai',
            summary: data.choices[0].message.content.trim()
          });
        }
      } catch (openAiErr) {
        console.warn('OpenAI API call failed, falling back to intelligent mock generator:', openAiErr.message);
      }
    }

    // Fallback Mock AI Response Generator (Rich & Contextual)
    const mockSummary = generateContextualMockSummary(indicatorName, categoryName, indiaRank, totalCountries, compareCountry);

    return res.json({
      success: true,
      source: 'ai_engine_mock',
      summary: mockSummary
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

function generateContextualMockSummary(indicator, category, rank, total, compareCountry) {
  const rankVal = parseInt(rank) || 40;
  const isHighRank = rankVal <= 30;
  const isMidRank = rankVal > 30 && rankVal <= 80;

  if (compareCountry) {
    return `### Executive Comparative Analysis: India vs ${compareCountry}

**Key Insights:**
India demonstrates strong structural momentum, driven by large-scale digital public infrastructure and high domestic market scale. However, ${compareCountry} maintains leads in per-capita capital depth, institutional R&D expenditures, and regulatory streamline efficiency.

**Strengths:**
- Rapid technology adoption & STEM talent pipeline.
- Scalable digital service infrastructure (UPI, Open Data APIs).

**Weaknesses:**
- Higher regional disparities in human capital investment.
- Lower per-capita capital allocation per worker.

**Actionable Policy Recommendations:**
1. Deepen public-private R&D investment to match 2%+ of GDP.
2. Streamline bureaucratic clearances to accelerate foreign capital deployment.`;
  }

  if (isHighRank) {
    return `### AI Strategic Insight: High Performance Vector

India ranks **#${rankVal}** out of ${total || 195} in ${indicator || 'this key metric'}, reflecting global excellence driven by strong structural investments and tech-enabled delivery.

**Core Strengths:**
- Unrivaled scale in skilled human resources and rapid digital integration.
- Strong momentum in government policy execution and digital infrastructure rollout.

**Vulnerabilities:**
- Disparities between urban innovation hubs and rural adoption rates.

**Key Improvements:**
1. Expand sub-national capacity building to ensure uniform quality nationwide.
2. Accelerate global private sector partnerships to sustain competitive advantage.`;
  } else if (isMidRank) {
    return `### AI Strategic Insight: Emerging Growth Category

India holds rank **#${rankVal}** globally in ${indicator || 'this indicator'}. While steady progress is evident over recent years, significant headroom remains for structural transformation.

**Strengths:**
- Broadening access through national digitization and targeted welfare delivery.
- Rising domestic consumption and expanding youth demographic dividend.

**Weaknesses:**
- Logistics friction and uneven regulatory compliance burden across states.

**Key Improvements:**
1. Implement single-window clearance frameworks to cut compliance overhead.
2. Direct targeted fiscal incentives toward skill upgradation and research infrastructure.`;
  } else {
    return `### AI Strategic Insight: Priority Transformation Needed

India's rank of **#${rankVal}** highlights a critical area requiring accelerated policy attention and systemic reform.

**Strengths:**
- High trajectory of government focus and recent welfare digitization schemes.

**Weaknesses:**
- Legacy infrastructure bottlenecks and lower per-capita budget allocation relative to global benchmarks.

**Priority Actions:**
1. Scale public health & education expenditures toward 6% of national GDP.
2. Strengthen local administrative governance and judicial resolution turnaround times.`;
  }
}
