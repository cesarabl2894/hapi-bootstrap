const pacientesDAO = fw.getDAO('pacientes');

async function getPacientebyId(pacienteid){
    return await pacientesDAO.getPacientebyId(pacienteid);
}

async function addPaciente(data){
    return await pacientesDAO.addPaciente(data);
}
async function updatePaciente(data){
    return await pacientesDAO.updatePaciente(data);
}

module.exports = {
    getPacientebyId,
    addPaciente,
    updatePaciente
}