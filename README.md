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

## Status Code

| Status Range | Use Case | Status Code |
| 1XX | Information    | 100 (Continue), 101 (Switching)   |
| 2XX | Success    | 200 (Ok), 201 (Created), 202 (Accepted), 204 (No Content), 206 (Partial Content)   | 
| 3XX | Redirection    | 301 (Moved Permanently), 302 (Temporarily Moving)  | 
| 4XX | Client Error    | 400 (Bad Request), 401 (Unauthorized), 403 (Authorization), 404 (Not Found), 405 (Method Not Allowed), 429 (Concurrent Request) |
| 5XX | Server Error    | 500 (Internal Server Error), 502 (Bad Gateway), 503 (Service Unavailable), 504 (Gateway Timeout), 507 (Insufficient Storage) |

## Graphql

```html
// Structure
books {
    id,
    title,
    publishedYear
    author
}

author {
    id,
    name,
    books
}

// Data 

list of books
list of authors
list of books with author details
list of author with book details
```

## Server Events

## Cookie

## IndexDB

## Browser inbuilt IndexDB example

```html
- To perform any operation on our DB we must create a transaction. A transaction can be a single operation or multiple operations that must all succeed, otherwise none of them will. Further down we will add four "cars" to our database one by one, but if any of those inserts failed for any reason then all four of them would fail because they happen on this single transaction we have created.
- We need to ge ta reference to our object store that holds the cars. We also get a reference to our indexes. These are simply just getting references to the values that we created on the database in the previous section.
- The put method on an object store is how we add data to our database. Based on the schema we created we will add a bunch of objects (cars). The ID We have given them is simply a unique number, you can also use the autoincrement value described previously when creating the object store to avoid having to set this value manually.
- These are our queries. You can always query an item directly with the value of your keyPath as we have here on the first line. On our second line we use the getAll method which will return an array with every result it finds. We are searching against our cars_colour index for "Red". We should expect to find two results. The final line searches for one result against our compound index for any vehicle with a colour of "Black" and a make of "Honda".
- These are success event handlers, they will fire when the query finishes and run whatever code is inside of them. They will not fire until the result value is populated on the query so it is safe to check it, as we do in these functions by logging it to the console.
- Lastly, since this is our only operation we will close our connection to the database when the transaction finishes. You don't need to manually fire the transaction with IndexedDB it will simply run on its own.
```