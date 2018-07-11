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
            payload: 
            {
                name:         fw.param.string().required(),
                password:     fw.param.string().required(),
                salary:       fw.param.number().required(),
                startingdate: fw.param.string().required(),
                email:        fw.param.string().required(),
                departmentid: fw.param.string().required(),
                roleid:       fw.param.string().required()
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
              userid:       fw.param.number().required(),
          }        
        }        
      } 
  }
];