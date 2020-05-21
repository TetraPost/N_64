const io = require('wsServ');
const { getArticleById } = require('controllers/ws/article');
const { getListArticle } = require('controllers/ws/article');
const ss = require('socket.io-stream');
const stream = ss.createStream();
const fs = require('fs');


io.on('connection', (socket) => {

ss(socket).on('article/uploadFile', async (stream, data, cb) => {
    try {
      const filename = (`public/upload/${Date.now()}-${data.name}`);
      const payload = stream.pipe(fs.createWriteStream(filename));
      cb(payload);
    } catch (error) {
      console.log(error);
    }
})




 /* socket.on('article/uploadFile3', async (data, cb) => {
    try {
      ss(socket).on('article/uploadFile3', function(stream, data) {
        var filename = (`public/upload/${data.name}`);
        stream.pipe(fs.createWriteStream(filename));
      });
    
      //console.log(data);
      // const payload = await getArticleById(data);
      // cb(payload);
    } catch (error) {
      throw new Error('shit is happens 2', error);
    }
  });*/

  socket.on('article/get', async (data, cb) => {
    try {
      const payload = await getArticleById(data);
      cb(payload);
    } catch (error) {
      throw new Error('shit is happens');
    }
  });

  socket.on('article/getList', async (cb) => {
    try {
      const payload = await getListArticle();
      cb(payload);
    } catch (error) {
      throw new Error('shit is happens');
    }
  });

});
