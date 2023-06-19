const db = require("../Model/index");
const Blog = db.blog;

exports.index = async (req, res) => {

    res.render("index");
};

exports.renderBlog = async(req,res) =>{
    
    res.render("createblog");
};