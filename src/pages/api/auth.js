import basicAuth from 'basic-auth';

export default function handler(req, res) {
  try {
    const credentials = basicAuth(req);

    if (credentials && credentials.name === process.env.BASIC_AUTH_USERNAME && credentials.pass === process.env.BASIC_AUTH_PASSWORD) {
      res.status(200).json({ status: 'Authenticated' });
    } else {
      res.status(401).end('Access denied');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).end('Internal server error');
  }
}
