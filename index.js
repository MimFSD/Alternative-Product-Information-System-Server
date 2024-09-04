const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 9000;

// Middlewares============
const options = {
    origin: [
      'http://localhost:5173',
      'https://altquery.web.app',
      'https://altquery.firebaseapp.com 1QQQQQQQQQQ23W22222222222422222222222222242424222222222222222222222222222222222222222222222222222222                        ',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  };
  app.use(cors(options));
  app.use(express.json());
  app.use(cookieParser());
  // Veryfy JWT token
  const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }
    if (token) {
      jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).send({ message: 'Unauthorized access' });
        }
        // console.log(decoded);
        req.user = decoded;
        next();
      });
    }
  };

  