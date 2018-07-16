const locationService = fw.getService('locations');

function getDepartments(){
    return fw.promise(async (resolve,reject) => {
        resolve(await locationService.getDepartments());
    })
}
function getcitybydept(request,h){
    return fw.promise(async (resolve,reject) => {
        resolve(await locationService.getcitybydept(request.params.deptid));
    })
}

module.exports = {
    getDepartments,
    getcitybydept
}