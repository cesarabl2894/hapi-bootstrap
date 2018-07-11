const medicosService = fw.getService('medicos');

function getMedicosByEsp(request,header){
    return fw.promise(async (resolve, reject) =>{
        resolve(medicosService.getMedicosByEsp(request.params.id));
    })
}

module.exports = {
    getMedicosByEsp
}