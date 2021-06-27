module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blog", {
        blog_Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_Id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'categories', // 'categories' refers to table name
                key: 'id', // 'id' refers to column name in categories table
            }
        }

    });
   

    return Blog;
};