const medicosService = fw.getService('medicos');

// Controlador de usuarios 
const userCtrl = fw.getController('users');

function getMedicosByEsp(request,header){
    return fw.promise(async (resolve, reject) =>{
        resolve(medicosService.getMedicosByEsp(request.params.id));
    })
}

function getMedicobyId(request,header){
    return fw.promise(async (resolve, reject) =>{
        resolve(medicosService.getMedicobyId(request.params.id));
    })
}

function addMedico(request, h){
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
        const userReg = await userCtrl.addUser(userRequest);
        if(userReg.success){
            const {username , email} = userRequest.payload;
            const Params = {
                nombre: request.payload.nombre,
                apellido: request.payload.apellido,
                direccion: request.payload.direccion,
                sexo: request.payload.sexo,
                telefono: request.payload.telefono,
                idespecialidad: request.payload.idespecialidad,
                email: email,   
                estado: request.payload.estado,            
                username: username,               
            };
            await medicosService.addMedico(Params);
            stResponse.message = "Se ha enviado la solicitud, espere confirmacion"
            stResponse.success = true;
            resolve(stResponse);                    
        }
        else{
            stResponse.message = "Medico Registrado con correo Electronico"
            stResponse.success = false;
            resolve(stResponse);
        }
          
    })
}

function updateMedico(request, h){
    return fw.promise(async (resolve,reject)=>{
        let stResponse = {success:false,message:''};
        const medico = await medicosService.getMedicobyId(request.payload.idmedico);
        if(medico.length != 1){
            stResponse.message = "Medico no Existe";
            resolve(stResponse);
            return;
        }

        const Params = {
            nombre: request.payload.nombre,
            apellido: request.payload.apellido,
            direccion: request.payload.direccion,
            sexo: request.payload.sexo,
            telefono: request.payload.telefono,
            idespecialidad: request.payload.idespecialidad,
            email: request.payload.email,   
            idmedico: request.payload.idmedico                          
        };
        await medicosService.updateMedico(request.payload);
        stResponse.message = 'Se ha actualizado su informacion'; 
        stResponse.success = true;
        resolve(stResponse); 
    })
}
function deleteMedico(request,header){
    return fw.promise(async (resolve,reject)=>{
        let stResponse = {success:false,message:''};
        const medico = await medicosService.getMedicobyId(request.payload.medicoId);

        

        if(medico.length != 1){
            stResponse.message = "Medico no Existe";
            resolve(stResponse);
            return;
        }
        
        await medicosService.deleteMedico(request.payload.medicoId);
        stResponse.message = 'Se ha eliminado Medico Correctamente'; 
        stResponse.success = true;
        resolve(stResponse); 
    })
}


function medicosbyHospital(request, h ){
    return fw.promise(async (resolve,reject)=>{
        resolve(medicosService.medicosbyHospital(request.params));
    });

}
module.exports = {
    getMedicosByEsp,
    getMedicobyId,
    addMedico,
    updateMedico,
    deleteMedico,
    medicosbyHospital
}