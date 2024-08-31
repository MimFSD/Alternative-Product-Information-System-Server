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