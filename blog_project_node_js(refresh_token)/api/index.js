const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.json());

const users = [
  {
    id: 1,
    username: "ram",
    password: "ram123",
    isAdmin: true,
  },
  {
    id: 2,
    username: "mahesh",
    password: "ram123",
    isAdmin: false,
  },
];

// refresh token array
var refreshTokenArray = [];


//token function

const generatedAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    "hello",
    { expiresIn: "1m" }
  );
};

const generatedRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    "refreshkey"
  );
};

//refresh token route

app.post("/api/refresh", (req, res)=>{
    // take the refresh token from user
        const refreshToken = req.body.refreshToken;
        console.log(refreshToken)
    // send error if there is no token or it is invalid
        if(!refreshToken) return res.send({message:'you are not authorised.'})
        if(!refreshTokenArray.includes(refreshToken)){
            return res.send({message:'refresh token not valid'})
        }
        jwt.verify(refreshToken,'refreshkey',(err, refreshUser)=>{
            err && console.log(err)
            //invalid token
            refreshTokenArray = refreshTokenArray.filter((refreshToken)=>{
                refreshToken!=refreshToken
            })
            const newAccessToken = generatedAccessToken(refreshUser)
            const newRefreshToken = generatedRefreshToken(refreshUser)
            refreshTokenArray.push(newRefreshToken)
            res.json({
                accessToken:newAccessToken,
                refreshToken:newRefreshToken
            })
        })
    //if everything is ok create new access token refresh token and send to user
});

///login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    const accessToken=generatedAccessToken(user);
    const refreshToken = generatedRefreshToken(user)
    refreshTokenArray.push(refreshToken)
    console.log(refreshTokenArray)
    res.send({
      user: user,
      accessToken: accessToken,
      refreshToken:refreshToken,
      message: "token generated",
    });
  } else {
    res.send({ message: "its not working." });
  }
});

//middleware auth verify

const authVerify = async (req, res, next) => {
  const token = await req.headers.token;
  console.log(token);
  if (token) {
    jwt.verify(token, "hello", (err, user) => {
      if (err) {
        res.send({ message: "token is not verified.." });
      }
      req.user = user;

      console.log("verify user", user);
      next();
    });
  } else {
    res.send({ message: "you are not authorization." });
  }
};

//delete user

app.delete("/api/users/:id", authVerify, (req, res) => {
  if (req.user.id == req.params.id || req.user.isAdmin) {
    res.send({ message: "user is deleted" });
  } else {
    res.send({ message: "you are not allowed to do that" });
  }
});

app.post('/api/logout', authVerify, (req,res)=>{
    const refreshToken = req.body.token;
    refreshTokenArray = refreshTokenArray.filter((token)=>token!== refreshToken)
    res.send("you are logout successfully")
})

app.listen(5000, () => {
  console.log("server started..");
});
