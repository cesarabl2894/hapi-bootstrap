const locationCtrl = fw.getController('locations');

module.exports = 
[
    {
        method: 'GET', path: '/departamentos', 
        options: { 
            handler: locationCtrl.getDepartments,
            tags: ['api'],
        } 
    },
    {
        method: "GET", path: '/ciudades/{deptid}',
        options:{
            handler: locationCtrl.getcitybydept,
            tags: ['api'],
            validate:{
                params: {
                    deptid: fw.param.number().integer().required()
                }
            }
        },
       
    }
];