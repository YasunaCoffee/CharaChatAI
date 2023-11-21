import basicAuth from 'basic-auth';

export default function handler(req, res) {
  const credentials = basicAuth(req);

  if (credentials && credentials.name === process.env.BASIC_AUTH_USERNAME && credentials.pass === process.env.BASIC_AUTH_PASSWORD) {
    // 認証が成功した場合、次のミドルウェアまたはルートハンドラーに進みます。
    // ここでは、単に成功のレスポンスを送ります。
    res.status(200).json({ status: 'Authenticated' });
  }
}
