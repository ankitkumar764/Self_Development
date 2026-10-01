// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Smart Study Planner API is running");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



// ---------------------------------------------->>>>>>>>>>>1st Reformation(database connected)



const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes")

dotenv.config();
//.confige likh dene se hum .env ke raaz ko process.env,(key) se get kar sakte hai 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Smart Study Planner API is running");
});

connectDB();
//after dotenv.config kyuki pehle uske through .env jo url hai uske get karke call karenge na connection ko 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});