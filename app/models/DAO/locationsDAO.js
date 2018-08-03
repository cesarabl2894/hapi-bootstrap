function getDepartments(){
    return fw.promise(async (resolve,reject) =>{
        const SQL = `SELECT * FROM departamentos`;
        resolve(await fw.db.execute('local',SQL,[]));
    })
}

async function getcitybydept(deptid){
        const SQL = `SELECT idciudad, nombre FROM ciudades WHERE iddepartamento = ?;`;
        return  await fw.db.execute('local',SQL,[deptid]);
}


module.exports = {
    getDepartments,
    getcitybydept
}