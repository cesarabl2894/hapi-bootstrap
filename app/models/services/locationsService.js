const locationDAO = fw.getDAO('locations');

function getDepartments(){
    return fw.promise(async (resolve,reject) =>{
        resolve(await locationDAO.getDepartments());
    })
}

async function getcitybydept(deptid){
    return await locationDAO.getcitybydept(deptid);
}

module.exports ={
    getDepartments,
    getcitybydept
}