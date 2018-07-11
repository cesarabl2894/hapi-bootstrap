const medicosDAO = fw.getDAO('medicos');

function getMedicosByEsp(espID){
    return fw.promise(async (resolve,reject) =>{
        resolve(await medicosDAO.getMedicosByEsp(espID));
    });
}

module.exports = {
    getMedicosByEsp
}