# きゃらチャットAI

きゃらチャットAIは、ピクシブ社の[ChatVRM](https://github.com/pixiv/ChatVRM)をフォークして作成されています。
ブラウザで簡単にAIキャラクターと会話ができるアプリケーションです。

チャット画面からAIキャラクターと会話を楽しむことができます。

きゃらチャットAIの各機能は主に以下の技術を使用しています。

- ユーザーの音声の認識
    - [Web Speech API(SpeechRecognition)](https://developer.mozilla.org/ja/docs/Web/API/SpeechRecognition)
- 返答文の生成
    - [ChatGPT API](https://platform.openai.com/docs/api-reference/chat)
- 読み上げ音声の生成
    - [Koemotion/Koeiromap API](https://koemotion.rinna.co.jp/)
- 3Dキャラクターの表示
    - [@pixiv/three-vrm](https://github.com/pixiv/three-vrm)


## デモ
調整中

## 実行
ローカル環境で実行する場合はこのリポジトリをクローンするか、ダウンロードしてください。

```bash
git clone https://github.com/YasunaCoffee/CharaChatAI.git
```

必要なパッケージをインストールしてください。
```bash
npm install
```

パッケージのインストールが完了した後、以下のコマンドで開発用のWebサーバーを起動します。
```bash
npm run dev
```

実行後、以下のURLにアクセスして動作を確認して下さい。

[http://localhost:3000](http://localhost:3000) 

# アプリケーションを公開する場合
Vercelにてデプロイする方法を推奨しています。以下の記事をご参考ください。
[3DキャラクターのAIチャットアプリをVercelでデプロイしたら一瞬だった](https://zenn.dev/yasuna/articles/8dc292545b7ea3)

# 環境変数の設定
Vercel上で環境変数を設定しています。
VercelのSettingで環境変数にOpenAIのAPIKEYとKoeiromapのAPIKEYを設定してください。
```
NEXT_PUBLIC_VERCEL_ENV_OpenAiKey
NEXT_PUBLIC_VERCEL_ENV_KoeiroMapKey
```