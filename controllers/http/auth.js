// const userModel = require('models/user');
const authModel = require('models/auth');
const config = require('config');
const bcrypt = require('bcrypt');

const hashPwd = async (pwd) => {
    const saltRounds = config.get('auth:strategies:local:saltRounds');
    const salt = await bcrypt.genSalt(saltRounds); 
    return bcrypt.hash(pwd, salt);
}

/*const run = async () => {
    const password = await hashPwd('123');
    authModel.create({
        strategy: 'local',
          data: {
           login: 'eldi007',
            password,
          },
          user:'5ec67a33bf19c51914d56456',
      }); 
} */

// run();

const login = async ( login, pwd ) => {
    const query = {
        strategy: 'local',
        'data.login': login,
    }
   const userAuth = await authModel.findOne(query);
   if(!userAuth) {
       return {status: 'no user' };
   }
   const { password: hashedPwd } = userAuth.data;
   const match = await bcrypt.compare(pwd, hashedPwd);
   // console.log('userAuth', match);
   if(!match) {
    return {status: 'bad password' };
    }
    const uid = userAuth.id;
    return {status: 'ok', uid };

}

module.exports = {
  login,
}

/* userModel.create({
    name:'Test',
})
ObjectId("5ec67a33bf19c51914d56456")
authModel.create({
    strategy: 'local',
      data: {
       login: 'eldi007',
        password: '123',
      },
      user:'5ec67a33bf19c51914d56456',
  }); */