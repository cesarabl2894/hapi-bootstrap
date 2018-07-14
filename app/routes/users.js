const UsersCtrl = fw.getController('users');

module.exports = 
[
  // { method: 'GET', path: '/users/add', options: { handler: UsersCtrl.renderAdd } },
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
    method: 'POST', path: '/users/delete', 
      options: { 
        handler: UsersCtrl.deleteUser, 
        tags: ['api'],
        validate: 
        {
          payload: 
          {
            email:  fw.param.string().required(),
          }        
        }        
      } 
  }
];