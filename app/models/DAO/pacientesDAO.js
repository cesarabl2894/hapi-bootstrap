async function getPacientebyId(pacienteid) {
    const SQL = `SELECT  idpaciente, pacientes.nombre, sexo, direccion , departamentos.iddepartamento, departamentos.nombre,
    ciudadid , ciudades.nombre AS nombreciudad
    FROM pacientes 
    INNER JOIN departamentos 
    ON  departamentos.iddepartamento = pacientes.departamentoid 
    INNER JOIN ciudades 
    ON ciudades.idciudad = pacientes.ciudadid
    WHERE pacientes.idpaciente = ?`;

    return await fw.db.execute('local', SQL, [pacienteid]);
}

async function addPaciente(data) {
    const SQL = `INSERT INTO medilocation.pacientes (nombre, apellido, email, sexo, direccion, departamentoid, ciudadid,username,fechanac)
    VALUES (?,?,?,?,?,?,?,?,?);`;
    return await fw.db.execute('local', SQL, [
        data.nombre,
        data.apellido,
        data.email,
        data.sexo,
        data.direccion,
        data.departamentoid,
        data.ciudadid,
        data.username,
        data.fechanac
    ])
}

async function updatePaciente(data) {
    const SQL = `
    UPDATE medilocation.pacientes
    SET pacientes.nombre = ?,
    pacientes.apellido = ?,
    pacientes.sexo = ?,
    pacientes.direccion = ?,
    pacientes.departamentoid = ?,
    pacientes.ciudadid = ?,
    pacientes.fechanac = ?
    WHERE pacientes.idpaciente = ?
    `;
    return await fw.db.execute('local', SQL, [
        data.nombre,
        data.apellido,
        data.sexo,
        data.direccion,
        data.departamentoid,
        data.ciudadid,
        data.fechanac,
        data.idpaciente
    ])
}
module.exports = {
    getPacientebyId,
    addPaciente,
    updatePaciente
}