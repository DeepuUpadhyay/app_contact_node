const asyncHandler = require("express-async-handler"); //this module handle all the exception without use try catch
const users = require(".././models/users");
const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = "shivam123";
// @Decs Register a user
// @Routes post api/users
//access public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All filed are mandatory.");
  }
  const userAvailable = await users.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User allready registerd");
  }
  const hashPassword = await bcrpt.hash(password, 10);
  console.log("Hasshed password:", hashPassword);
  const userRegister = await users.create({
    userName,
    email,
    password: hashPassword,
  });
  console.log("User is Create:", userRegister);
  if (userRegister) {
    res.status(201).json({ _id: userRegister.id, email: userRegister.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid.");
  }
  res.json({ message: "register user" });
});

// @Decs Login a user
// @Routes post api/login
//access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All filed are mandatory.");
  }
  const userAvailable = await users.findOne({ email });
  //compare password wit hashPassword
  if (userAvailable && bcrpt.compare(password, userAvailable.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: userAvailable.userName,
          email: userAvailable.email,
          id: userAvailable.id,
        },
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

// @Decs current a user
// @Routes get api/current
//access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
