# Yahoo Fantasy entegrasyonu

## 1. API erişimi başvurusu

Başvuru: https://sports.yahoo.com/developer/access/

Önerilen bilgiler:

- Product/App Name: `Fantasy League Media Center`
- Website: `https://omerrklc.github.io/hamle-study/fantasy-league/`
- Expected Users: İlk 3–6 ay için gerçekçi arkadaş ligi kullanıcı sayısı
- Access: `Read-only`
- Use case: `Private Yahoo Fantasy Basketball league data will be displayed in a companion media app. The app will read league metadata, fantasy teams, standings, weekly matchups and transactions to generate league news and visual recaps. It will not automate roster changes or wagering.`

## 2. Anahtarları yerel ortama ekleme

`.env.example` dosyasını `.env` adıyla kopyala ve Yahoo'nun verdiği değerleri gir:

```env
YAHOO_CLIENT_ID=...
YAHOO_CLIENT_SECRET=...
YAHOO_REDIRECT_URI=http://localhost:8787/auth/yahoo/callback
YAHOO_LEAGUE_KEY=...
PORT=8787
```

Consumer Secret hiçbir zaman `app.js`, HTML veya GitHub deposuna yazılmamalı.

## 3. Yerel çalıştırma

```powershell
npm run dev
```

Uygulamayı `http://localhost:8787` adresinden aç ve `Yahoo'ya Bağlan` düğmesine bas.

## 4. Veri akışı

Backend şu Yahoo kaynaklarını okur:

- League metadata
- Standings
- Scoreboard / weekly matchups
- Teams
- Transactions

İlk gerçek Yahoo yanıtı alındıktan sonra bu alanlar uygulamanın takım, eşleşme, puan durumu ve haber veri modeline dönüştürülecek.
