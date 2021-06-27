const db = require("../models");
const Blog = db.blog;
const Op = db.Sequelize.Op;

exports.CreateBlog = (req, res) => {
    // Validate request
    console.log("requserid", req.userId);
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const blog = {
        user_Id: req.userId,
        title: req.body.title,
        description: req.body.description,
        category_id: req.body.category_id
    };

    console.log("blogs req", blog);

    Blog.create(blog)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.BlogUpdate = async (req, res) => {
    console.log("userid", req.user_Id);
    const { blog_Id, user_Id, title, description, category_id } = req.body;
    try {
        let data = await Blog.findOne({ where: { user_Id: req.userId } });
        // let user = await Users.findOne({ where: { email: email } });
        console.log("data111", data);
        if (!data) {
            return res.status(200).json({
                message: "You Cannot Update this record "
            });
        }
        else {
            // console.log("data",data.user_Id === req.body.user_Id);
            if (data.user_Id !== req.userId) {
                res.send({
                    message: `You are not allowed to update this Record!`
                });
            }
            else {
                Blog.update(req.body, {
                    where: { blog_Id: blog_Id, user_Id: req.userId, }
                })
                    .then(num => {
                        // console.log("data",num);
                        if (num == 1) {
                            res.send({
                                message: "Blog was updated successfully.",
                            });
                        } else {
                            res.send({
                                message: `Cannot update blog with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                            });
                        }
                    })
            }

        }
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
}


    // blog.update(req.body, {
    //   where: { id: id }
    // })
    //   .then(num => {
    //     if (num == 1) {
    //       res.send({
    //         message: "Tutorial was updated successfully."
    //       });
    //     } else {
    //       res.send({
    //         message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message: "Error updating Tutorial with id=" + id
    //     });
    //   });
