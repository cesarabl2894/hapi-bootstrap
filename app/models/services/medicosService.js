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

function getEspecialidades(medicoId){
    return fw.promise(async (resolve,reject)=>{
        resolve(medicosDAO.getEspecialidades());
    })
}
function buscarCitasPaciente(pacienteid){
    console.log(pacienteid);
    return fw.promise(async (resolve,reject)=>{
        resolve(medicosDAO.buscarCitasPaciente(pacienteid));
    })
}
function buscarCitasMedico(medicoid){
    return fw.promise(async (resolve,reject)=>{
        resolve(medicosDAO.buscarCitasMedico(medicoid));
    })
}
function reservarCita(data){
    return fw.promise(async (resolve,reject)=>{
        resolve(medicosDAO.reservarCita(data));
    })
}
module.exports = {
    getMedicosByEsp,
    getMedicobyId,
    addMedico,
    updateMedico,
    deleteMedico,
    medicosbyHospital,
    getEspecialidades,
    buscarCitasMedico,
    buscarCitasPaciente,
    reservarCita
}