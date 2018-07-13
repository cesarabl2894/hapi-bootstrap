const userService = fw.getService('user');
const jwt = require('jsonwebtoken');

async function createToken(obj) {
    console.log('Creating Token:');
    return await jwt.sign(obj, fw.settings.SessionKey, { algorithm: 'HS256', expiresIn: "2h" });
}


async function checkAuth(data){
    const users = await userService.getUserbyEmail(data.email);
    const user = await fw.lodash.find(users,{email: data.email});

    //Check if search return a valid user
    if(user){
        //Encrypt Password and check if match
        const hashPassword = fw.utils.encrypt('SHA256', data.password + user.Salt);
        // console.log(hashPassword);
        if (hashPassword === user.password) {
            //Check if user still active
            console.log('Logged');
            return await createToken(fw.lodash.omit(user, ['Salt', 'password']));
        }
    }
    return fw.boom.unauthorized('Invalid Credentials');
}


module.exports =
{
    checkAuth
}