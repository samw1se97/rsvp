const express = require('express'),
  morgan = require('morgan'),
  cors = require('cors'),
  app = express(),
  path = require('path');

const GuestRouter = require('./router/guestRoutes');
const AdminRouter = require('./router/adminRoutes');

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// MIDDLEWARE
app.use(cors());
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/rsvp/guest', GuestRouter);
app.use('/rsvp/admin', AdminRouter);

module.exports = app;
