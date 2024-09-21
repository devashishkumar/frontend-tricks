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

## GraphQL

implement GraphQL console in application:

```html
// Structure
events {
    _id,
    title,
    description
    price
	date
}
```

![graphql](https://github.com/user-attachments/assets/8e0209fe-1217-4d2f-b6d6-47bb932a3446)

![graphql-mutation](https://github.com/user-attachments/assets/c52c52a6-6a0a-4b66-bdce-5f32f75de1b5)


## Setup mongodb 7 in windows

- mongo commands are not working in CLI in case mongodb 6 or greater installed. We need to install mongosh CLI using this url. [mongosh windows installer](https://www.mongodb.com/try/download/shell)

- mongodb basic commands

```html

// get all db's list
show dbs;

// use existing db in case not exist mongodb will create it
use testdb;

// return current selected database name
db;

// list all collections (table) in current database

show collections;

// collections are like tables in mogodb. create collection syntax and insert single record
db.posts.insert({"title":"title1", "body":"description1", "category":"category1", "created_at":Date()})

// insert multiple records (records are documents in mongodb just like rows in sql)
db.posts.insertMany([{"title":"title1", "body":"description1", "category":"category1", "created_at":Date()},
{"title":"title2", "body":"description2", "category":"category2", "created_at":Date()},
{"title":"title3", "body":"description3", "category":"category3", "created_at":Date()},
{"title":"title4", "body":"description4", "category":"category4", "created_at":Date()}]);

//- difference between 'save' and 'insert' command is that the 'save' command can insert or update a document whereas 'insert' only performs the insertion.

db.fruit.save({"name":"apple", "color":"red","shape":"round"});

// this save statement will update the record with specified id
db.fruit.save(
{"_id" : ObjectId("53fa1809132c1f084b005cd0"),"name":"apple", 
"color":"real red","shape":"round"})

// update record (this query only change the fields value we have passed in $set)
db.posts.update({"title": "title2"}, {$set: {
"body":"update description",
"updated_at": Date()
}}, {upsert: true});

// update record (in this case if we are not using other fields to update it will blank the reset of the fields)
db.posts.update({"title": "title1"}, {
"body":"update description again",
"updated_at": Date()
}, {upsert: true});

// drop collection
db.collectionName.drop();

// get all documents mongodb query
db.posts.find().pretty();

// find with basic criterias
db.posts.find({"title": "title1"});

// OR condition with find
db.posts.find({$or:[{"title":"title1"},{"title": "title2"}]}).pretty();

// AND condition with find
db.posts.find({$and:[{"title":"title1"},{"body": "description1"}]}).pretty();

// nested documents
db.newcollection.insert([
	{
		title: "MongoDB Overview",
		description: "MongoDB is no SQL database",
		by: "tutorials point",
		url: "http://www.tutorialspoint.com",
		tags: ["mongodb", "database", "NoSQL"],
		likes: 100
	},
	{
		title: "NoSQL Database",
		description: "NoSQL database doesn't have tables",
		by: "tutorials point",
		url: "http://www.tutorialspoint.com",
		tags: ["mongodb", "database", "NoSQL"],
		likes: 20,
		comments: [
			{
				user:"user1",
				message: "My first comment",
				dateCreated: new Date(2013,11,10,2,35),
				like: 0
			}
		]
	}
]);

// using AND/OR in the same query

db.newcollection.find({"likes": {$gt:10}, $or: [{"by": "tutorials point"},
   {"title": "MongoDB Overview"}]}).pretty();


db.empDetails.insertMany(
	[
		{
			First_Name: "Ashish",
			Last_Name: "Kumar",
			Age: "26",
			e_mail: "ashishkumar@gmail.com",
			phone: "9999999999"
		},
		{
			First_Name: "Sunny",
			Last_Name: "Kumar",
			Age: "27",
			e_mail: "sunnykumar@gmail.com",
			phone: "5555555555"
		},
		{
			First_Name: "New",
			Last_Name: "Name",
			Age: "28",
			e_mail: "newname@gmail.com",
			phone: "8888888888"
		}
	]
);

db.empDetails.find().pretty();


// equal operator
db.empDetails.find({Age:{$eq:"26"}});

// not equal operator
db.empDetails.find({Age:{$ne:"24"}});

// greater than operator
db.empDetails.find({Age:{$gt:"24"}});

// NOT IN operator
db.empDetails.find({Age:{$nin:['24', '26']}});

// IN operator
db.empDetails.find({Age:{$in:['24', '26']}});

// and operator
db.empDetails.find({$and:[{First_Name:'Ashish'}, {Age: '26'}]});

// all operator equivalent to above and operator

db.empDetails.find({ First_Name :{$all:[['Ashish', 'Sunny']]}});

db.empDetails.find( { First_Name: [ 'Ashish', 'Sunny' ] } );

// remove document/s from collection/s
db.empDetails.remove({'First_Name':'Ashish'});

// remove single document from collection/s. second parameter s true for single record delete and false for all criteria
db.empDetails.remove({'First_Name':'Ashish'}, true);

// remove all documents from collection
db.empDetails.remove({});

```

## mongoose in node js

For nodejs version less than 18. mongoose connection syntax
```ts
mongoose
    .connect("mongodb://localhost:27017/newdb")
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });

```

For nodejs version 18 or later. mongoose connection syntax
```ts
mongoose
    .connect("mongodb://127.0.0.1:27017/newdb")
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });

```