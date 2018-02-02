const logger = require('../utils/logger');
const ingestModel = require('../models/model-ingest');

//ingestUserInfo controller
module.exports.ingestUserInfo = (req, res) => {
    let userInfo = req.body;
    ingestModel.ingestUserInfo(userInfo, function(err, response){
        if(err){
            logger.error(`ingestUserInfo error: ${err}`);
            res.status(500).json({status:'error', message:err, statusCode: 500});
        } else {
            res.status(200).json({status:'ok', message:response, statusCode: 200});
        }
    });
}
