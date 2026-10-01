const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");


//REQ->Client/Frontend Se aayi hui info req me hoti hai like req.body =>bec body se register kiya ab iske paas acess hai
//RES->Backend JO bhej ta hai info to client that's it



const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    //Jab Variable ka naam and property name same toh sirf ek likh dene ka
    // const name = "Ankit";
    // const user = {
    //   name
    // };


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
    });


  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};


//Seconly Reformation begins from here



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    //jwt rules 
    const token=jwt.sign(
      {userId:user._id}, //payload
      process.env.JWT_SECRET, //secret
      {expiresIn:"7d"} //options
    )

    console.log("token",token)

    res.json({
      message: "Login successful",
      user,
      token
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

// module.exports = { registerUser };








// const User = require("../models/User");

// const createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);

//     res.status(201).json({
//       message: "User created successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to create user",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   createUser,
// };











