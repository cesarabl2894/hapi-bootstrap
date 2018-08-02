const medicosDAO = fw.getDAO('medicos');

function getMedicosByEsp(espID){
    return fw.promise(async (resolve,reject) =>{
        resolve(await medicosDAO.getMedicosByEsp(espID));
    });
}
function getMedicobyId(medicoId){
    return fw.promise(async (resolve,reject) =>{
        resolve(await medicosDAO.getMedicobyId(medicoId));
    });
}

function addMedico(data){
    return fw.promise(async (resolve,reject) =>{
        resolve(await medicosDAO.addMedico(data));
    });
}

function updateMedico(data){
    return fw.promise(async (resolve,reject) =>{
        resolve(await medicosDAO.updateMedico(data));
    });
}
function medicosbyHospital(data){
    return fw.promise(async (resolve,reject)=>{
        resolve(medicosDAO.medicosbyHospital(data));
    })
}

function deleteMedico(medicoId){
    return fw.promise(async (resolve,reject)=>{
        resolve(medicosDAO.deleteMedico(medicoId));
    })
}
module.exports = {
    getMedicosByEsp,
    getMedicobyId,
    addMedico,
    updateMedico,
    deleteMedico,
    medicosbyHospital
}