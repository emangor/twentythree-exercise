const package = require('../package');
const logger = require('../utils/logger');
const dbUtil = require('../utils/dbUtil');

module.exports.healthcheck = (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        name: package.name, 
        version: package.version
    });  
}

module.exports.dbcheck = (req, res) => {
    let data = [];
    let sql = `SELECT NOW()`;
    dbUtil.sqlToDB(sql, data, function(err, result){
        if (err){
            res.status(500).json(err);
        } else {
            res.status(200).json(result);
        }
    }); 
}
