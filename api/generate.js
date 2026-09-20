export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  const apiKey = process.env.BFL_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'BFL_API_KEY is not configured in Vercel Environment Variables.' });
  }
  
  try {
    const response = await fetch('https://api.bfl.ai/v1/flux-3-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-key': apiKey
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).json({ error: 'Failed to proxy request to BFL', details: error.message });
  }
}
