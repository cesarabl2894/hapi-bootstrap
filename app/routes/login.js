const securityCtrl = fw.getController('security');

module.exports = [
    {
        method: 'POST',
        path: '/auth',
        options:{
            handler: securityCtrl.validateAuth,
            tags: ['api'],
            validate: {
                payload: {
                    email: fw.param.string().required(),
                    password: fw.param.string().required()
                }
            }
        }
    }
]
