const db = require("../Model/index");
const Blog = db.blog;

exports.index = async (req, res) => {

const blogs = await db.blog.findAll();
    console.log(blogs);
    res.render("index", {blogs});
};

exports.renderBlog = async(req,res) =>{
    
    res.render("createblog");
};

exports.createBlog = async(req,res) =>{
    console.log(req.file)
    const{title,description}=req.body

    db.blog.create({
        title: title,
        description: description,
        image: "http://localhost:4000/" + req.file.filename,
    });

    res.redirect("/index");
};

exports.singleBlog = async(req,res) =>{
    console.log(req.params.id);
    
    const blog= await Blog.findAll({
        where:{
            id: req.params.id
        }
    })
    console.log(blog[0]);

    res.render("singleblog",{blog:blog[0]});
};

exports.deleteBlog = async(req,res) =>{
    console.log(req.params.id);
    
    const blog= await Blog.destroy({
        where:{
            id: req.params.id
        }
    })
    

    res.redirect("/")
};

exports.editBlog = async(req,res) =>{
    console.log(req.params.id);

};





// exports.showBlogs= async(req,res)=>{
//     const blog = await db.blog.findAll();
//     console.log(blog);

// };