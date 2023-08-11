const express = require("express")
const app = express()
const db = require("../db/connection")
const usersRouter = require("../routes/users")
const showsRouter = require("../routes/shows")

app.use("/users", usersRouter);
app.use("/shows", showsRouter);

module.exports = app;
