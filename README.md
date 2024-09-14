## create express app

- npm i -g express
- express projectname
- npm install express-ejs-layouts --save

## protect site to access from iframe

```html
we can use any of these headers, "frame-ancestors", "X-Frame-Options 'DENY'"
res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");

sandbox iframe like this:
<iframe src="http://localhost:3000/security/" sandbox="allow-same-origin allow-scripts"></iframe>
```

## protect app from outside javascript, use CSP (Content Security Policy) headers

```html
define nonce in inline javascipt like this

<script nonce="appRandomKey"></script>

use header in application to use this nonce like this

"default-src 'self';" means load sources from our source
"script-src 'self' 'nonce-appRandomKey' 'unsafe-inline' https://code.jquery.com https://cdn.jsdelivr.net;" means script would be load having nonce is appRandomKey and from code.jquery.net and cdn.jsdeliver.net
res.setHeader(
    "Content-Security-Policy",
    "default-src 'self';" +
      "script-src 'self' 'nonce-appRandomKey' 'unsafe-inline' https://code.jquery.com https://cdn.jsdelivr.net;"
  );
```

## X-Powered-By header (return application develop in which language/tool). How to remove this header

```ts
res.removeHeader('X-Powered-By');
```

## Referrer-Policy header (return information referrer url )

```ts
res.removeHeader('Referrer-Policy', 'no-referrer');
```

## Other headers

```html
The X-Content-Type-Options header with the value nosniff ensures that user agents do not attempt to guess the format of the data being received. User Agents such as browsers, commonly attempt to guess what the resource type being requested is, through a process called MIME type sniffing.

HTTP Strict Transport Security (HSTS) is a simple and widely supported standard to protect visitors by ensuring that their browsers always connect to a website over HTTPS. HSTS exists to remove the need for the common, insecure practice of redirecting users from http:// to https:// URLs.

res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

```