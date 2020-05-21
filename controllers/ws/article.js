const ArticleModel = require('models/article.js');

const getArticleById = async (id) => {
  try {
    const userList = await ArticleModel.findById(id);
    return userList;
  } catch (error) {
    return false;
  }
};

const getListArticle = async () => {
  try {
    const userList = await ArticleModel.find();
    return userList;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getArticleById = getArticleById;
module.exports.getListArticle = getListArticle;