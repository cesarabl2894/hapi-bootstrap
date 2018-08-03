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
async function getPacientebyEmail(email){
    return await pacientesDAO.getPacientebyEmail(email);
}

module.exports = {
    getPacientebyId,
    addPaciente,
    updatePaciente,
    getPacientebyEmail
}