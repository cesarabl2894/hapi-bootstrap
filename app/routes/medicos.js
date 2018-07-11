const medicosctr = fw.getController('medicos');

module.exports = 
[
    {
        method: 'GET', path: '/medicos/{id}', 
        options: { 
            handler: medicosctr.getMedicosByEsp,
            tags: ['api'],
            validate: {
                params: {
                    id: fw.param.number().integer().required()
                }
            }
        } 
    }
];