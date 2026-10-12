# Yahoo Fantasy Sports API başvuru paketi

Bu belge, başvuru formuna aktarılacak ürün bilgilerini içerir. Telefon, kişisel e-posta ve Client ID gibi bilgiler güvenlik ve gizlilik nedeniyle bu herkese açık repoya yazılmamalıdır.

## Başvuru adresi

https://sports.yahoo.com/developer/access/

## Ürün bilgileri

- Consumer-Facing Product or App Name: `E-MAC Fantasy Basketball`
- Business Title: `Independent Developer`
- Business Name & Address: `Ömer Kılıç — Individual Developer, Kağıthane, İstanbul, Türkiye`
- Website URL: `https://emac-fantasy-league.onrender.com/`
- Expected Users: İlk 3–6 ayda 8–20 özel lig üyesi
- Access Type: Read-only

## Brief Company Description

E-MAC is a small, non-commercial independent project created for a private fantasy basketball league. It provides league members with a mobile-friendly companion experience for following league activity in one place.

## Intended Use Case

E-MAC is a read-only companion application for a private Yahoo Fantasy Basketball league. League members sign in with their own Yahoo accounts and explicitly authorize access to the fantasy data available to them. The application displays league metadata, teams, rosters, standings, matchups, scoreboards, player information, transactions and live scoring updates in a mobile-friendly interface. It does not modify rosters, submit lineup changes, create transactions or perform any other write operation. Initial access is limited to approximately 8 league members, with an expected maximum of 20 users during the first 3–6 months.

## Additional Notes

The application already has a working Yahoo OpenID Connect sign-in flow using Authorization Code with PKCE, an HTTPS callback and server-side token handling. OAuth tokens are not exposed to browser storage. Public privacy and terms pages are available at `/privacy.html` and `/terms.html`. Yahoo Fantasy data will be identified in the product with a source attribution linking to Yahoo Fantasy. The application is independent, non-commercial and is not affiliated with or endorsed by Yahoo or the NBA. We are requesting read-only access only.

## İstenen veri kaynakları

- User games and leagues
- League metadata
- Teams and team rosters
- Standings
- Matchups and scoreboards
- Player metadata and stats
- League transactions

## Göndermeden önce

- Yahoo Developer hesabındaki mevcut Client ID forma eklenmeli.
- İsim, Yahoo hesabıyla ilişkili e-posta ve telefon bilgileri eksiksiz yazılmalı.
- Website URL olarak canlı Render adresi kullanılmalı.
- Form gönderildikten sonra tarih ve onay e-postası saklanmalı.
- Yahoo tarafından erişim sözleşmesi gönderilirse imzalanmalı; ondan sonra application confirmation formu kullanılmalı.
