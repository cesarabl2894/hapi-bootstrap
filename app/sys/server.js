'use strict';

require('./fw');
// if(process.env === 'development'){
    require('dotenv').config();
// }

const Hapi  = require('hapi');

const server = new Hapi.Server({
    port: process.env.PORT ,
    host: process.env.HOST  ,
    routes: 
    {
        cors: true 
    }
});


function getRoutes(){
    let routesPaths = fw.utils.getFiles('routes/**/*.js', true);
    let routes = [];

    if(fw.utils.isArray(routesPaths))
    {
        for(let r of routesPaths )
            routes.push(require(r));
    }
    
    console.log(routes);
    return routes;
}

function getPlugins() {
    let pluginsPaths = fw.utils.getFiles('sys/Plugins/**/*.js', true);
    let plugins = [];

    if (fw.utils.isArray(pluginsPaths)) {
        for (let p of pluginsPaths)
            plugins.push(require(p));
    }

    return plugins;
}


async function start(){

    console.log('Starting...');
    process.on('unhandledRejection', error => {
        console.log('unhandledRejection', error);
    });

    try 
    {        
        for (let plugin of getPlugins())
            await plugin(server);

        const routes = getRoutes();
        for(let route of routes)
            server.route(route);
                
        // Start server
        await server.start();
        console.log(`Server is running on ${server.info.uri}`);
        console.log(`Enviroment: ${process.env.NODE_ENV || 'development'}`);
    }
    catch(error){
        console.error(error);
    }
    
    
}

start();