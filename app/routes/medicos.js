const medicosctr = fw.getController('medicos');

module.exports = 
[
    {
        method: 'GET', path: '/medicos/especialidad/{id}', 
        options: { 
            handler: medicosctr.getMedicosByEsp,
            tags: ['api'],
            validate: {
                params: {
                    id: fw.param.number().integer().required()
                }
            }
        } 
    },
    {
        method: 'GET', path: '/medicos/{id}', 
        options: { 
            handler: medicosctr.getMedicobyId,
            tags: ['api'],
            validate: {
                params: {
                    id: fw.param.number().integer().required()
                }
            }
        } 
    },
    {
        method: 'POST',
        path: '/medicos/add',
        options:{
            handler: medicosctr.addMedico,
            tags: ['api'],
            validate:{
                payload:{
                    nombre: fw.param.string().required(),
                    apellido: fw.param.string().required(),
                    direccion: fw.param.string().required(),
                    sexo: fw.param.string().required().min(1).max(2),
                    telefono: fw.param.string().required(),
                    idespecialidad: fw.param.number().integer().required(),
                    email: fw.param.string().email().required(),  
                    estado: fw.param.string().required(),            
                    username: fw.param.string().required(),
                    password: fw.param.string().required(),
                    usertypeid:fw.param.number().integer().required(),
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/medicos/update',
        options:{
            handler: medicosctr.updateMedico,
            tags: ['api'],
            validate:{
                payload:{
                    idmedico: fw.param.number().integer().required(),
                    nombre: fw.param.string().required(),
                    apellido: fw.param.string().required(),
                    direccion: fw.param.string().required(),
                    sexo: fw.param.string().required().min(1).max(2),
                    telefono: fw.param.string().required(),
                    idespecialidad: fw.param.number().integer().required(),
                    email: fw.param.string().email().required()
                }
            }
        }
    },
    { 
        method: 'DELETE', path: '/medicos/deleteMedico', 
          options: { 
            handler: medicosctr.deleteMedico, 
            tags: ['api'],
            auth: 'jwt',
            validate: 
            {
              payload: 
              {
                medicoId: fw.param.number().integer().required(),
              }        
          }        
         } 
    },
    {
        method: 'GET',
        path: '/medicos/{espid}/{deptid}/{ciudadid}',
        options: {
            handler: medicosctr.medicosbyHospital,
            tags: ['api'],
            validate:{
                params:{
                    espid: fw.param.number().integer().required(),
                    deptid: fw.param.number().integer().required(),
                    ciudadid: fw.param.number().integer().required()
                }
            }
        }
    },
    {
        method: 'GET', path: '/especialidades', 
        options: { 
            handler: medicosctr.getEspecialidades,
            tags: ['api']
        } 
    },
    {
        method: 'GET', path: '/consultas/medico/{medicoid}', 
        options: { 
            handler: medicosctr.buscarCitasMedico,
            tags: ['api'],
            validate: {
                params: {
                    medicoid: fw.param.number().integer().required()
                }
            }
        } 
    },
    {
        method: 'GET', path: '/consultas/paciente/{pacienteid}', 
        options: { 
            handler: medicosctr.buscarCitasPaciente,
            tags: ['api'],
            validate: {
                params: {
                    pacienteid: fw.param.number().integer().required()
                }
            }
        } 
    },
];