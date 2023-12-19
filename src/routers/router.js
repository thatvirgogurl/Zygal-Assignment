const exprees =require('express')
const route=exprees.Router()

const {authentication}=require('../middleware/auth.js')
const {
  createUser,
  Login,
  HomePage,
  SubmitButton,
  SeachDatainCookie,
  Buttom3,
  Logout,
} = require("../Controller/pages.js");
route.post("/createUser", createUser);
route.post("/login", Login);
route.get("/home", authentication, HomePage);
route.post("/logout", authentication, Logout);
// Button 1: Submit data and store in COOKIE
route.post("/submitData", authentication, SubmitButton);

// Button 2: Search data in COOKIE
route.get("/searchData", authentication, SeachDatainCookie);

// Button 3: Clear all cookies
route.post("/clearCookies", authentication, Buttom3);

// Button 4: Logout and redirect to login page - 1
route.post("/logout", authentication, Logout);
module.exports=route;