const logger = require('../utils/logger');
const dbUtil = require('../utils/dbUtil');
const successMsg = 'record successfully inserted';
/* 
 * ingest users video consumption
 * @return success
 */
module.exports.ingestUserInfo = (userInfo, callback) => {
    let data = [
        userInfo.user_ip,
        userInfo.user_agent,
        userInfo.video_id,
        userInfo.play_start,
        userInfo.play_end
    ];
    let sql = `INSERT INTO userinfo 
                           (user_ip, user_agent, video_id, play_start, play_end) 
                    VALUES ($1, $2, $3, $4, $5)`;
    dbUtil.sqlToDB(sql, data, function(err, result){
        if (err){
            logger.error(`ingestUserInfo() error: ${err}`);  
            callback(err);
        } else {
            callback(null, successMsg);
        }
    }); 
}
