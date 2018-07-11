function getMedicosByEsp(especialidadID){
    return fw.promise(async (resolve, reject) =>{
        const SQL = 
        `SELECT concat(nombre, ' ' ,apellido) as nombremedico, telefono, email, nombre_especialidad 
        from medicos inner join especialidades on medicos.idespecialidad = especialidades.idespecialidad
        WHERE especialidades.idespecialidad = ? `;
        resolve(await fw.db.execute('local',SQL,[especialidadID]));
    })
}

module.exports = {
    getMedicosByEsp
}