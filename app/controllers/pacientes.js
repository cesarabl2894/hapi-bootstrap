// Servicio de Pacientes
const pacientesService = fw.getService('pacientes');

// Cargar controlador de usuario para cargar paciente
const userCtrl = fw.getController('users');

// const usersService = fw.getService('user');

function getPacientebyId(request, h){
    return fw.promise(async (resolve,reject) => {
        resolve(pacientesService.getPacientebyId(request.params.pacienteid))
    })
}

function addPaciente(request, h){
    return fw.promise(async (resolve,reject)=>{
        let stResponse = {success:false,message:''};
        const userRequest = {
            payload : {
                username: request.payload.username,
                password: request.payload.password,
                email: request.payload.email,
                usertypeid: request.payload.usertypeid
            }
            
        }
        // console.log('asdasdas');
        const userReg = await userCtrl.addUser(userRequest);
        if(userReg.success){
            const {username , email} = userRequest.payload;
            const Params = {
                nombre: request.payload.nombre,
                apellido: request.payload.apellido,
                email: email,
                sexo: request.payload.sexo,
                direccion: request.payload.direccion,
                departamentoid : request.payload.departamentoid,
                ciudadid : request.payload.ciudadid,
                username: username,
                fechanac: request.payload.fechanac
               
            };
            await pacientesService.addPaciente(Params);
            stResponse.message = "Gracias por su Registro"
            stResponse.success = true;
            resolve(stResponse);                    
        }
        stResponse.message = "Paciente registrado con Correo Electronico"
        stResponse.success = false;
        resolve(stResponse);  
    })
}
function updatePaciente(request,h){
    return fw.promise(async (resolve,reject)=>{
        let stResponse = {success:false,message:''};
        console.log(request.payload.idpaciente);
        const paciente = await pacientesService.getPacientebyId(request.payload.idpaciente);
        console.log(paciente);
        if(paciente.length != 1){
            stResponse.message = "Paciente no Registrado";
            resolve(stResponse);
            return;
        }
        const Params = {
            idpaciente: request.payload.idpaciente,
            nombre: request.payload.nombre,
            apellido: request.payload.apellido,
            sexo: request.payload.sexo,
            direccion: request.payload.direccion,
            departamentoid : request.payload.departamentoid,
            ciudadid : request.payload.ciudadid,
            fechanac: request.payload.fechanac       
        };
        await pacientesService.updatePaciente(request.payload);
        stResponse.message = 'Se ha actualizado su informacion'; 
        stResponse.success = true;
        resolve(stResponse);

    })
    
    
}

module.exports = {
    getPacientebyId,
    addPaciente,
    updatePaciente
}