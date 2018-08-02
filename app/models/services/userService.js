//====================
// Dependencies
//====================
const userDAO = fw.getDAO('user');

//====================
// Methods
//====================
function validLogin(email, password)
{
    return fw.promise(async (resolve,reject) => 
    {
        let Account = await userDAO.getUserbyEmail(email);
        
        if(Account.length > 0)
        {        
            Account = Account[0];
            console.log(Account,password,Account.Salt);
            console.log(fw.utils.getMD5(password+Account.Salt));
            console.log(fw.utils.getMD5(password+Account.Salt));
            if(fw.utils.getMD5(password+Account.Salt) === Account.password)
                {
                    console.log('El combo de los super pequenines');
                    resolve(Account);
                }
                
        }
        
        resolve(false);
    })
}

function getUsers(){
    return fw.promise(async (resolve,reject) =>     {
        resolve(await userDAO.getUsers());
    });
}

function getUserbyEmail(email)
{
    return fw.promise(async (resolve,reject) => {
        resolve(await userDAO.getUserbyEmail(email));
    });
}

function getUser(id){
    return fw.promise(async (resolve,reject) => 
    {
        resolve(await userDAO.getUser(id));
    });
}

function addUser(data)
{
    return fw.promise(async (resolve,reject) => {
        resolve(await userDAO.addUser(data));
    });    
}

function updateUser(data)
{
    return fw.promise(async (resolve,reject) => 
    {
        resolve(await userDAO.updateUser(data));
    });    
}

function deleteUser(data){
    return fw.promise(async (resolve,reject) => 
    {
        resolve(await userDAO.deleteUser(data));
    });    
}

function updatePassword(data) {
    return fw.promise(async (resolve,reject) =>{
        await resolve(userDAO.updatePassword(data));
    });
}

module.exports = {
    validLogin,
    getUsers,
    getUser,
    getUserbyEmail,
    addUser,
    updateUser,
    deleteUser,
    updatePassword
}