// module.exports = app => {
    const express = require("express"),
      router = express.Router();

    const middleware = require("./auth");
    const users = require('../controller/user.contoller');
    const blogs = require("../controller/blog.contoller");


    // const router = require("express").Router();

    router.post("/signup", users.signup);
    router.post("/login", users.login);
    router.post("/refreshToken", users.refreshToken);

    router.post("/CreateBlog", middleware.verifyToken, blogs.CreateBlog);
    router.put("/BlogUpdate", middleware.verifyToken, blogs.BlogUpdate);

    // app.use('/api/Trootech', router);
    module.exports = router;
// };