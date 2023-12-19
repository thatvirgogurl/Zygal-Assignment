const userModel = require("../model/model.js");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email)
      return res
        .status(400)
        .send({ status: "false", msg: "Plz provide email" });
    if (!password)
      return res
        .status(400)
        .send({ status: "false", msg: "Plz provide email" });
    const unique = await userModel.findOne({ email: email });
    if (unique)
      return res
        .status(400)
        .send({ status: "false", msg: "this email already exits" });
    const userCreated = await userModel.create(req.body);
    if (userCreated) {
      res.status(201).send({ status: true, msg: userCreated });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
//pageOne
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate user credentials
    if (!email)
      return res
        .status(400)
        .send({ status: "false", msg: "Plz provide email" });
    if (!password)
      return res
        .status(400)
        .send({ status: "false", msg: "Plz provide email" });
    let verifyUser = await userModel.findOne({
      email: email,
      password: password,
    });

    if (verifyUser) {
      let token = jwt.sign(
        {
          userId: verifyUser._id.toString(),
        },
        "Secreate_Key",
        { expiresIn: "24h" }
      );
      // Set the token as a cookie
      res.cookie("token", token);

      // Redirect to the home page
      res.redirect("/home");
    } else {
      res.redirect("/login");
    }

  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
//Page2
const HomePage = async (req, res) => {
  try {
    res.send({status:true,msg:"succesfull in home page"});
  } catch (error) {
    // Token is invalid or expired
    return res.redirect("/login");
  }
};
//submit data and storeInCookies
 const SubmitButton=async (req, res) => {
 try {
   const { data } = req.body;
   const userId = req.userId;

   res.cookie("userData", data);

   res.json({ message: "Data submitted and stored!", userData: data });
 } catch (error) {
   console.error(error);
   res.status(500).send("Internal Server Error");
 }
 };
//sarchData
const SeachDatainCookie = async (req, res) => {
 try {
   const { searchString } = req.body;
   const userData = req.cookies.userData || "";

   if (userData.includes(searchString)) {
     res.json({ message: "Data found!", matchingData: userData });
   } else {
     res.json({ message: "Data not found!" });
   }
 } catch (error) {
   console.error(error);
   res.status(500).send("Internal Server Error");
 }
};
//Clear all cookies
const Buttom3 = async (req, res) => {
  try {
    // Clear the userData cookie
    res.clearCookie("userData");
    res.json({ message: "All cookies cleared!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
//Logout
const Logout=async (req, res) => {
       try {
        res.clearCookie("token");
          return res.redirect("/login");
         
       } catch (error) {
         console.error(error);
         res.status(500).send("Internal Server Error");
       }
     };

module.exports = {
  createUser,
  Login,
  HomePage,
  SubmitButton,
  SeachDatainCookie,
  Buttom3,
  Logout,
};
