const mainCtrl = fw.getController('main');

module.exports = 
[
  { method: 'GET', path: '/testurl', 
    options: {
      handler: function (request, h) {
        return 'Hello!';
    },
     tags: ['api'] 
    },
  },
  { method: 'POST', path: '/main', options: { handler: mainCtrl.render } }
];