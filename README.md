Server Site of Alternative Product system


Server .env   ==============

```
DB_USER=
DB_PASS=
```

Client .env   ================


```
VITE_APIKEY ============
VITE_AUTHDOMAIN=altquery.firebaseapp.com
VITE_PROJECTID=altquery
VITE_STORAGEBUCKET=altquery.appspot.com
VITE_MESSAGINGSENDERID=
VITE_APPID=

VITE_IMGBB_API=7ad04da7b55bd8e224c5ca06e4112249

# VITE_API_URL='http://localhost:9000'
# VITE_API_URL='https://alt-query-server.vercel.app'
```

Server Some gide ====================____ --

```
vercel
vercel --prod
```

- Let's create cookie options for both the production and local server

```
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};
//localhost:5000 and localhost:5173 are treated as same site.  so sameSite value must be strict in the development server.  in production, sameSite will be none
// in development server secure will false.  in production secure will be true
```

- now we can use this object for the cookie option to modify cookies

```
//creating Token
app.post("/jwt", logger, async (req, res) => {
  const user = req.body;
  console.log("user for token", user);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  res.cookie("token", token, cookieOptions).send({ success: true });
});

//clearing Token
app.post("/logout", async (req, res) => {
  const user = req.body;
  console.log("logging out", user);
  res
    .clearCookie("token", { ...cookieOptions, maxAge: 0 })
    .send({ success: true });
});
```



<!-- # Alternative Product Information System Backend

Welcome to the backend repository of the Alternative Product Information System project! This repository contains the backend server code built using Node.js, Express.js, and MongoDB.

## Key Features

1. **User Product Posting**: Users can post pictures and details (name, brand, query) of products they do not like.
2. **Recommendations**: Users can receive recommendations for better alternatives based on the products they dislike.
3. **Secure Authentication**: Utilizes JWT tokens for secure user authentication, ensuring only authorized users can access certain features.
4. **CRUD Operations**: Provides endpoints for Create, Read, Update, and Delete operations for managing posts and recommendations.
5. **Data Separation**: Backend API endpoints are structured to handle post data, recommendation data, and user authentication separately.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web application framework for Node.js, used for building the RESTful API.
- **MongoDB**: NoSQL database for storing user and product data.
- **JWT**: JSON Web Tokens for secure authentication.
- **Other npm Packages**: Used for various functionalities like data validation, error handling, etc.

## Project Structure

The project is structured to ensure clarity and maintainability. Here’s an overview:

- **src/**: Contains all the source code.
  - **index.js**: Entry point of the application.
  - **middleware/**: Middleware functions.
  - **others**

To install and run Alternative-Product-Information-System-Server locally, follow these steps:

1. Clone the repository:

   ```
   git clone url
   ```

2. Navigate into the project directory:

   ```
   cd Alternative-Product-Information-System-Server
   ```

3. Install dependencies using npm:

   ```
   npm install
   ``` -->
