# Yahoo Fantasy ve kullanıcı girişi

## Mevcut durum

- Yahoo Developer uygulaması Public Client olarak oluşturuldu.
- Kullanıcı girişi Authorization Code + PKCE ile backend üzerinden çalışır.
- OAuth state ve nonce doğrulanır; Yahoo ID Token imzası sunucuda kontrol edilir.
- Yahoo erişim ve yenileme belirteçleri tarayıcıya veya kaynak koda yazılmaz.
- Fantasy Sports verisi için Yahoo erişim başvurusunun ayrıca onaylanması gerekir.

## Yerel ortam

`.env.example` dosyasını `.env` adıyla kopyala:

```env
YAHOO_CLIENT_ID=...
YAHOO_CLIENT_SECRET=
YAHOO_REDIRECT_URI=http://localhost:8787/auth/yahoo/callback
YAHOO_LEAGUE_KEY=
PORT=8787
NODE_ENV=development
```

Public Client kullanımında `YAHOO_CLIENT_SECRET` boş bırakılır. Secret hiçbir zaman HTML, `app.js` veya GitHub deposuna yazılmamalıdır.

Uygulamayı çalıştır:

```powershell
npm run dev
```

## Canlı ortam

Backend ve arayüz aynı Render web servisinden yayınlanır. Render ortam değişkenleri:

```env
YAHOO_CLIENT_ID=...
YAHOO_CLIENT_SECRET=
YAHOO_REDIRECT_URI=https://SERVIS-ADI.onrender.com/auth/yahoo/callback
YAHOO_LEAGUE_KEY=
NODE_ENV=production
```

Render servis adresi belli olduktan sonra `YAHOO_REDIRECT_URI` değeri Yahoo Developer uygulamasındaki Redirect URI ile birebir aynı olmalıdır.

## API uçları

- `GET /healthz`: servis sağlık kontrolü
- `GET /api/yahoo/status`: Yahoo bağlantı durumu
- `GET /auth/yahoo?purpose=login`: Yahoo ile kullanıcı girişi
- `GET /auth/yahoo/callback`: Yahoo OAuth dönüşü
- `GET /api/yahoo/user`: giriş yapan kullanıcının doğrulanmış profili
- `GET /api/yahoo/dashboard`: onay sonrasında Fantasy lig verileri
- `POST /api/logout`: sunucu oturumunu kapatma

## Fantasy verileri

Yahoo onayı geldiğinde backend şu kaynakları okuyacak:

- Lig bilgileri
- Puan durumu
- Haftalık eşleşmeler ve skor tablosu
- Takımlar ve kadrolar
- İşlem geçmişi

İlk gerçek Yahoo yanıtı alındıktan sonra bu veriler E-MAC arayüz modeline dönüştürülecek.

## Bilinen geçici sınırlama

Oturumlar şu anda sunucu belleğinde tutulur. Servis yeniden başladığında kullanıcıların yeniden giriş yapması gerekir. Üretim sürümünde kalıcı ve çoklu sunucuya uygun oturum deposu eklenmelidir.
