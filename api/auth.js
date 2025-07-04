export default function handler(req, res) {
  const { code } = req.query;
  
  if (!code) {
    // Redirect to GitHub OAuth
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = `https://funeral-test.vercel.app/api/auth`;
    const scope = 'repo,user';
    
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
    res.redirect(302, githubAuthUrl);
    return;
  }
  
  // Exchange code for token
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.access_token) {
      // Return success page with token
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authentication Success</title>
        </head>
        <body>
          <script>
            window.opener.postMessage({
              type: 'authorization_github',
              token: '${data.access_token}',
              provider: 'github'
            }, window.location.origin);
            window.close();
          </script>
        </body>
        </html>
      `);
    } else {
      res.status(400).json({ error: 'Failed to get access token' });
    }
  })
  .catch(error => {
    res.status(500).json({ error: 'Authentication failed' });
  });
}
