const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            required: true
        }
    }
)


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);

    next();
}
)


/* Compare plaintext with hashed password */
userSchema.methods.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password);
};



/* Strip password from JSON output */
userSchema.set("toJSON", {
    transform: (_, doc) => {
        delete doc.password;
        return doc;
    },
});



const User = mongoose.model("User", userSchema)


module.exports = User