class mysqlAdapter {
    constructor(config)
    {
        this.dbconfig = config;
        this.mysql = require('promise-mysql');
        this.conn = null;
    }


    async createConnection() {
        return await this.mysql.createConnection
        ({
            host: process.env.MYSQL_SERVER,
            user:  process.env.MYSQL_USERNAME,
            password:  process.env.MYSQL_PASS,
            database:  process.env.MYSQL_DB
        });
    }


    async execute(sql,options) {
        this.conn = this.conn || await this.createConnection();
        return await this.conn.query(sql,options);
    }


    async close(){
        await this.conn.end();
    }
}

module.exports = mysqlAdapter;