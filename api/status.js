export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Polling URL query parameter is required' });
  }
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch status from BFL', details: error.message });
  }
}
