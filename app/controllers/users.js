//====================
// Dependencies
//====================
const usersService = fw.getService('user');

function addUser(request, h) {
    return fw.promise(async (resolve,reject) => {
        // console.log(request.payload);
        let stResponse = {success:false,message:''};
        const user = await usersService.getUserbyEmail(request.payload.email);
        if(user.length > 0) {
            stResponse.message = "Correo Electronico ya registrado";
            resolve(stResponse);
            return;
        }


        const salt = fw.utils.getUUID();
        const hashPassword = fw.utils.encrypt('SHA256',request.payload.password + salt);
        
        const Params =  {
            username: request.payload.username,
            password: hashPassword,
            Salt: salt,
            email: request.payload.email,
            usertypeid: request.payload.usertypeid
        }
        await usersService.addUser(Params);
        stResponse.message = "Se ha registrado Correctamente"
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

function getUsers(request,h){
    return fw.promise(async (resolve,reject) =>{
        resolve (await usersService.getUsers());
    })
}

function editUser(request, h){
    return fw.promise(async (resolve,reject) => 
    {
        let stResponse = {success:false,message:''};
        const user = await usersService.getUser(request.payload.userid);
        if(user.length != 1)
        {
            stResponse.message = "User does not exist";
            resolve(stResponse);
            return;
        }

        //Make sure he is not adding an already existing email
        if(request.payload.email != user[0].Email)
        {
            const userExist = await usersService.getUserbyEmail(request.payload.email);
            if(userExist.length > 0)
            {
                stResponse.message = "Email account is already linked to another user. Please use another email address.";
                resolve(stResponse);
                return;
            }    
        }
        
        const Params = 
        {
            Salary: request.payload.salary, 
            StartingDate: request.payload.startingdate, 
            Email: request.payload.email, 
            DepartmentId: request.payload.departmentid, 
            RoleId: request.payload.roleid, 
            ID: request.payload.userid
        }
    
        await usersService.updateUser(Params);
        stResponse.success = true;
        resolve(stResponse);                    
    });    
}

function deleteUser(request, h){
    return fw.promise(async (resolve,reject) => {
        let stResponse = {success:false,message:''};
        const user = await usersService.getUserbyEmail(request.payload.email);
        if(user.length != 1) {
            stResponse.message = "Usuario no existe";
            resolve(stResponse);
            return;
        }

        await usersService.deleteUser(request.payload.email);
        stResponse.success = true;
        stResponse.message = "Usuario eliminado correctamente";
        resolve(stResponse);        
    });    
}

function updatePassword(request,h){
    return fw.promise(async (resolve,reject)=>{
        
        const user = await usersService.getUserbyEmail(request.payload.email);
        let stResponse = {success:false,message:''};

        const salt = fw.utils.getUUID();

        if(user.length != 1 ){
            stResponse.message = "Usuario no registrado";
            resolve(stResponse);
            return;

        }

        const hashPassword = fw.utils.encrypt('SHA256',request.payload.password + salt);

        const Params = {
            password: hashPassword,
            Salt: salt,
            email: request.payload.email,
        }

        await usersService.updatePassword(Params);
        stResponse.message = 'Se ha actualizado Contrasena';
        stResponse.success = true;

        resolve(stResponse);
    });
}

module.exports = 
{
    addUser,
    editUser,
    getUsers,
    deleteUser,
    updatePassword
}