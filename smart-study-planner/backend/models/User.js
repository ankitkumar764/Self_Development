const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        // collation:"Users"
    }
   //Remeber Schema Contains Only two Argument isliye we have put colection with time
);

module.exports = mongoose.model("User", userSchema);
//if we not give collection in schema by default name of collection is smallcase User