const db = require("../Model/index");
const Blog = db.blog;
// const fs = require("fs");
// const path=require("path");

exports.index = async (req, res) => {
    const blogs = await db.blog.findAll();
    console.log(blogs);
    res.render("index", {
        blogs
    });
};


exports.renderBlog = async (req, res) => {
    res.render("createblog");
};


//C==> Create
exports.createBlog = async (req, res) => {
    const {
        title,
        description
    } = req.body

    db.blog.create({
        title: title,
        description: description,
        image: "http://localhost:4000/" + req.file.filename,
    });

    res.redirect("/index");
};

//R==> Read
exports.singleBlog = async (req, res) => {
    const blog = await Blog.findAll({
        where: {
            id: req.params.id
        }
    })
    res.render("singleblog", {
        blog: blog[0]
    });
};

//D==> Delete
exports.deleteBlog = async (req, res) => {
    const blog = await Blog.destroy({
        where: {
            id: req.params.id
        }
    })
    // const filePath = path.join(
    //     "uploads",
    //     blog.path.replace("http://localhost:4000/" , "")
    //     );

    // fs.unlink(filePath, (err) => {
    //     if (err) {
    //       console.log("Error deleting file:", err);
    //     } else {
    //       console.log("File deleted successfully:", filePath);
    //     }
    //   });

    res.redirect("/")


};

//U==>Update
exports.editBlog = async (req, res) => {
    const blog = await Blog.findAll({
        where: {
            id: req.params.id
        }
    })
    res.render("edit", {
        blog: blog[0]
    });

};

exports.updateBlog = async (req, res) => {
    console.log(req.body.title);
    console.log(req.body.imagepath);

        let updateData = {
            title: req.body.title,
            description: req.body.description,
        };

        if (req.file) {
            const image = "http://localhost:4000/" + req.file.filename;
            updateData.image = image;
        }

    const blog = await Blog.update(updateData, {
        where: {
            id: req.params.id,
        },
    });

    console.log("Blog updated successfully");
    res.redirect("/");
};

