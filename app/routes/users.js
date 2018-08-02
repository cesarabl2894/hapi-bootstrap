const UsersCtrl = fw.getController('users');

module.exports = 
[
  { method: 'POST', path: '/users/add', 
      options: 
      { 
        handler: UsersCtrl.addUser, 
        tags: ['api'],
        validate: 
        {
            payload: {
              username:     fw.param.string().required(),
              email:        fw.param.string().required(),
              password:     fw.param.string().required(),
              usertypeid:   fw.param.number().integer().required()
            }
        }                
      },
  },
  { 
    method: 'DELETE', path: '/users/delete', 
      options: { 
        handler: UsersCtrl.deleteUser, 
        tags: ['api'],
        auth: 'jwt',
        validate: 
        {
          payload: 
          {
            email:  fw.param.string().required(),
          }        
      }        
     } 
  },
  {
    method: 'GET',
    path: '/users/all',
    options: {
      handler: UsersCtrl.getUsers,
      auth: 'jwt',
      tags: ['api']

    }
  },
  {
    method:'PUT',
    path: '/users/changepass',
    options: {
      handler : UsersCtrl.updatePassword,
      auth: 'jwt',
      tags: ['api'],
      validate:{
        payload:{
          email: fw.param.string().required(),
          password: fw.param.string().required()
        }
      }
    }
  }
];