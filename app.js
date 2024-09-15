var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejsLayouts = require("express-ejs-layouts");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var securityRouter = require('./routes/security');
var restApi = require('./routes/restapi');
var graphQl = require('./routes/graphql');
var serverEvent = require('./routes/serverevents');
// var ApolloServer = require('@apollo/server');
// startStandaloneServer = require('@apollo/server/standalone');
// typeDefs = require('./routes/typeDefs');
// resolvers = ('./routes/resolvers');

var app = express();


// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
// async function apolloServer() {
//   const { url } = startStandaloneServer(server, {
//     listen: { port: 4001 },
//   });
// }
// apolloServer();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/security', securityRouter);
app.use('/api', restApi);
app.use('/graphql', graphQl);
app.use('/serverevent', serverEvent);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
