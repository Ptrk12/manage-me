import userType from "../types/userType";


const express = require("express");
const cors = require('cors');
const app = express();
const jwt = require("jsonwebtoken")
app.use(express.json())
app.use(cors());

const users:userType[] = [new userType("patryk","bajak","haslo123"),new userType("test1","test2","haslo123")]
let refreshTokens:string[] = [];

app.post("/api/refresh", (req:any, res:any) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err:any, user:any) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

});

const generateAccessToken = (user:any) => {
  return jwt.sign({ username: user.username, role: user.role }, "mySecretKey", {
    expiresIn: "25s",
  });
};

const generateRefreshToken = (user:any) => {
  return jwt.sign({ username: user.username, role: user.role  }, "myRefreshSecretKey");
};

app.post("/api/login", (req:any, res:any) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({
      username: user.username,
      role: user.role,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json("Username or password incorrect!");
  }
});

const verify = (req:any, res:any, next:any) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err:any, user:any) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

app.get("/api/projects", verify, (req:any, res:any) => {
  if (req.user.role !== null) {
    res.status(200).json("Success");
  } else {
    res.status(403).json("You are not allowed to do that");
  }
});

app.post("/api/logout", verify, (req:any, res:any) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.status(200).json("You logged out successfully.");
});

app.listen(5000, () => {
    console.log("Backend server running on port 5000");
});
