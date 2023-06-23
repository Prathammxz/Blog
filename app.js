const express = require("express");
const app = express();
const port = 4000;
const db= require("./Model/index");
const ejs= require("ejs");
const blogController = require ("./Controller/blogController");
const {storage, multer} = require("./Services/multerConfig");
const upload = multer({storage:storage})
const path = require("path")
app.set("view engine","ejs");

db.sequelize.sync({force:false});

app.get("/", blogController.index);

app.get("/createblog", blogController.renderBlog);

app.post("/createblog", upload.single("image"), blogController.createBlog);

app.get("/index", blogController.index);

app.get("/single/:id", blogController.singleBlog);

app.get("/delete/:id", blogController.deleteBlog);

app.get("/edit/:id", blogController.editBlog);

app.post("/updateblog/:id", upload.single('image'), blogController.updateBlog);

app.use(express.static(path.join(__dirname,"Uploads")));



app.listen(port, () => {
    console.log("Node server started at port 4000");
  });