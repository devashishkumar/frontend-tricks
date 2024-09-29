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

### Mutation

```html

mutation {
  createEvent(eventInput: {title: "Title", description: "Description", price: 10.10}) {
	_id
    title
    description
    price
    date
  }
}

```

![graphql-mutation](https://github.com/user-attachments/assets/c52c52a6-6a0a-4b66-bdce-5f32f75de1b5)

### Fetch

```ts

query {
  events {
    _id
    title
    description
    price
    date
  }
}

```

## Create Event

```ts

mutation {
  createEvent(eventInput: {title: "Title", description: "Description", price: 10.10, date: "2024-09-22T08:05:37.182Z"}) {
    title
    description
    _id
    price
    date
    creator {
      email
    }
  } 
}

```

## Get Events

```ts
query {
  events {
    title
    price
  }
}

```

## Create User

```ts
mutation {
  createUser(userInput: {email: "ashishmail@gmail.com", password: "password12"}) {
    email
  }
}

```

![graphql-fetch](https://github.com/user-attachments/assets/a0c72e46-7ada-4759-9c66-65e0b8776eef)

## Add data to mongodb

![mongodb-console](https://github.com/user-attachments/assets/5a2a75a8-5811-47d1-a726-531bc19923b4)

## Save data to mongodb along with GraphQL implementation

![save-data-to-mongodb](https://github.com/user-attachments/assets/afc08c37-f458-411b-893c-c3e06d7d58ca)

## Get data from mongodb along with GraphQL implementation

![get-records-from-db](https://github.com/user-attachments/assets/914d927e-6297-428d-aedb-922761e4e6ac)

## Create User and save in mongodb along with GraphQL implementation

![create-user](https://github.com/user-attachments/assets/df74fa75-bbe0-42ca-adca-1ef12ef7c583)

## Duplicate User Validation

![duplicate-user-validation](https://github.com/user-attachments/assets/e3034b1c-84f3-4b17-bb1f-840fa7ac612b)

## Create Event with User relation and same for User

![db-relation](https://github.com/user-attachments/assets/5b6b7bc0-79bd-4598-bfbf-1b73cc6a3213)

## Get relational table fields

```ts

query {
  events {
    creator {
      email
      _id
    }
  }
}

```

Input

```ts

query {
  events {
    creator {
      email
      _id
      createdEvents {
        _id
        title
        creator {
          email
        }
      }
    }
  }
}

```

Output

```ts

{
  "data": {
    "events": [
      {
        "creator": {
          "email": "ashishmail@gmail.com",
          "_id": "66efc1957c08bdea5be34454",
          "createdEvents": [
            {
              "_id": "66efd4378fff88110bc21af9",
              "title": "Title",
              "creator": {
                "email": "ashishmail@gmail.com"
              }
            }
          ]
        }
      }
    ]
  }
}

```

![find-user-details-from-events](https://github.com/user-attachments/assets/96c6edf3-625a-49d3-a719-ec77000644a1)

## Create Booking

Input

```ts
mutation {
  createBooking(eventId: "66eff777a4d1d1c3d8a407b7" ) {
    _id
    createdAt
    user {
      email
    }
  }
}
```

Output

```ts
{
  "data": {
    "createBooking": {
      "_id": "66f7ceec9c9e4006b1c99e97",
      "createdAt": "2024-09-28T09:39:56.412Z",
      "user": {
        "email": "ashishmail@gmail.com"
      }
    }
  }
}
```

![create-booking](https://github.com/user-attachments/assets/3718c817-d8a6-4579-b776-21f40a43a551)

## Get Booking

Input

```ts
query {
  bookings {
    createdAt
    event {
      title
      creator {
        _id
        createdEvents {
          _id
          title
        }
      }
    }
  }
}
```

Output

```ts
{
  "data": {
    "bookings": [
      {
        "createdAt": "2024-09-28T09:23:58.294Z",
        "event": {
          "title": "Title",
          "creator": {
            "_id": "66efc1957c08bdea5be34454",
            "createdEvents": null
          }
        }
      }
    ]
  }
}
```

## Cancel Booking

```ts
mutation {
  cancelBooking (bookingId: "bookingId") {
    title
    creator {
      email
    }
  }
}
```

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

Connect application with mongodb cloud (connection string)
```ts

mongoose
    .connect("mongodb+srv://kumarashish0512:<db_password>@graphql.f9rwv.mongodb.net/")
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });

```

How MongoDB Atlas works. Please refer to this YouTube Video URL.
[Advance MongoDB](https://www.youtube.com/watch?v=39DqOhkyt1I)