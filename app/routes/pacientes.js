const pacientesCtrl = fw.getController('pacientes');

module.exports = [
    {
        method: 'GET',
        path: '/pacientes/{pacienteid}',
        options: {
            handler: pacientesCtrl.getPacientebyId,
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    pacienteid: fw.param.number().integer().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/pacientes/agregar',
        options: {
            handler: pacientesCtrl.addPaciente,
            tags: ['api'],
            validate: {
                payload:{
                    nombre: fw.param.string().required(),
                    apellido: fw.param.string().required(),
                    email: fw.param.string().email().required(),
                    sexo: fw.param.string().required().min(1).max(2),
                    direccion: fw.param.string().required(),
                    password: fw.param.string().required(),
                    departamentoid:fw.param.number().integer().required(),
                    ciudadid:fw.param.number().integer().required(),
                    usertypeid:fw.param.number().integer().required(),
                    username : fw.param.string().required(),
                    fechanac: fw.param.string().required()
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/pacientes/actualizar',
        options: {
            handler: pacientesCtrl.updatePaciente,
            tags: ['api'],
            auth: 'jwt',
            validate: {
                payload:{
                    idpaciente: fw.param.number().integer().required(),
                    nombre: fw.param.string().required(),
                    apellido: fw.param.string().required(),
                    sexo: fw.param.string().required().min(1).max(2),
                    direccion: fw.param.string().required(),
                    departamentoid:fw.param.number().integer().required(),
                    ciudadid:fw.param.number().integer().required(),
                    fechanac: fw.param.string().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/pacientes/correo/{email}',
        options: {
            handler: pacientesCtrl.getPacientebyEmail,
            tags: ['api'],
            auth: 'jwt',
            validate: {
                params: {
                    email: fw.param.string().email().required()
                }
            }
        }
    },
]