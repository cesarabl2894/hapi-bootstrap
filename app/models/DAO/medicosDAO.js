function getMedicosByEsp(especialidadID){
    return fw.promise(async (resolve, reject) =>{
        const SQL = 
        `SELECT concat(nombre, ' ' ,apellido) as nombremedico, telefono, email, nombre_especialidad 
        from medicos inner join especialidades on medicos.idespecialidad = especialidades.idespecialidad
        WHERE especialidades.idespecialidad = ? `;
        resolve(await fw.db.execute('local',SQL,[especialidadID]));
    })
}
function getMedicobyId(medicoId){
    return fw.promise(async (resolve, reject) =>{
        const SQL = 
        `SELECT * FROM medicos WHERE medicos.idmedico = ? `;
        resolve(await fw.db.execute('local',SQL,[medicoId]));
    });
}


async function addMedico(data){
    const SQL = `INSERT INTO medicos (nombre, apellido, direccion,sexo,telefono,idespecialidad,email,estado,username)
    VALUES (?,?,?,?,?,?,?,?,?);`;
    return await fw.db.execute('local',SQL,[
        data.nombre,
        data.apellido,
        data.direccion,
        data.sexo,
        data.telefono,
        data.idespecialidad,
        data.email ,
        data.estado ,           
        data.username,
        data.password,
        data.usertypeid
    ]);
}

async function updateMedico(data){
    const SQL = `
    UPDATE medicos
    SET medicos.nombre = ?,
    medicos.apellido = ?,
    medicos.direccion = ?,
    medicos.sexo = ?,
    medicos.telefono = ?,
    medicos.idespecialidad = ?,
    medicos.email = ?
    WHERE medicos.idmedico = ?
    `;
    return await fw.db.execute('local',SQL,[
        data.nombre,
        data.apellido,
        data.direccion,
        data.sexo,
        data.telefono,
        data.idespecialidad,
        data.email,
        data.idmedico
    ])
}

async function deleteMedico(medicoId){
    const SQL =
    `DELETE FROM medicos 
    WHERE medicos.idmedico = ? `;
    return await fw.db.execute('local',SQL,[medicoId]);
}
async function medicosbyHospital(data){
    console.log(data);
    const SQL =`
    SELECT nombre AS nombreMedico, medicos.apellido ,
    especialidades.nombre_especialidad as nombreEspecialidad,
    hospitales.nombre_hospital AS nombreHospital,
    detalle_hospital_medico.disponibilidad AS disponibilidad
    FROM medicos
    INNER JOIN detalle_hospital_medico
    ON medicos.idmedico = detalle_hospital_medico.idmedico
    INNER JOIN hospitales
    ON detalle_hospital_medico.idhospital = hospitales.idhospital
    INNER JOIN especialidades 
    ON medicos.idespecialidad = especialidades.idespecialidad
    WHERE medicos.idespecialidad = ? 
    AND hospitales.departamentoid = ?
    AND hospitales.ciudadid = ?
    AND medicos.estado = 'activo';`;

    return await fw.db.execute('local',SQL,[
        data.espid,
        data.deptid,
        data.ciudadid
    ])

}
async function getEspecialidades() {
    const SQL = `SELECT * FROM especialidades;`;

    return await fw.db.execute('local', SQL, []);
}

module.exports = {
    getMedicosByEsp,
    getMedicobyId,
    addMedico,
    updateMedico,
    deleteMedico,
    medicosbyHospital,
    getEspecialidades
}