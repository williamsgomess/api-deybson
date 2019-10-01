const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true)
mongoose.connect("mongodb+srv://admin:admin@cluster0-s4bc6.mongodb.net/econove", { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;