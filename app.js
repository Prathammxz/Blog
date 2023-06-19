const express = require("express");
const app = express();
const port = 4000;
const db= require("./Model/index");
const ejs= require("ejs");
const blogController = require ("./Controller/blogController");
app.set("view engine","ejs");

db.sequelize.sync({force:false});

app.get("/", blogController.index);

app.get("/createblog", blogController.renderBlog)



app.listen(port, () => {
    console.log("Node server started at port 4000");
  });