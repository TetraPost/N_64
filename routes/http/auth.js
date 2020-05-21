const express = require('express');
const routes = express.Router();
const multer = require('multer');
const upload = multer();

const authCtrl = require('controllers/http/auth');

routes.all('/login', function(req, res, next)  {
  res.render('login');
});

routes.get('/check', function(req, res, next)  {
  const { uid } = req.session;
  if(uid){
    res.send(`залогинен ${uid}`);
  } else {
    res.send('Гость');
  }
});

routes.post('/auth/login', upload.none(), async (req, res, next) => {
  const { login, pwd } = req.body;
  const { login: loginUser } = authCtrl;
  const result = await loginUser(login, pwd);
  if( result.status === 'ok'){
    req.session.uid = result.uid;
  }
  
  res.json(result);
});

routes.get('/logout', upload.none(), async (req, res, next) => {
  req.session.uid = null;
  res.send('разлогинен');
});
module.exports = routes;
