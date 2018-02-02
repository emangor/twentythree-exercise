const logger = require('../utils/logger');
const dbUtil = require('../utils/dbUtil');
/* 
 * get user count per videoId
 * @param videoId
 * @return count
 */
module.exports.getUserCountPerVideo = (videoId, callback) => {
    let type = 'count';
    let name = 'User Count Per Watched Video';
    let data = [ videoId ];
    let returnObj = {
        'type': type,
        'name': name        
    }
    let sql = `SELECT COUNT(*) FROM (
                      SELECT DISTINCT user_ip 
                        FROM userinfo 
                       WHERE video_id = $1
                ) AS temp`;
    dbUtil.sqlToDB(sql, data, function(err, result){
        if (err){
            logger.error(`getUserCountPerVideo() error: ${err}`);  
            callback(err);
        } else {
            returnObj.result = result;
            callback(null, returnObj);
        }
    }); 
}

/* 
 * get average seconds watched per video
 * @param videoId
 * @return seconds
 */
module.exports.getAverageWatchedPerVideo = (videoId, callback) => {
    let type = 'average';
    let name = 'Average Seconds Watched per Video';
    let data = [ videoId ];
    let returnObj = {
        'type': type,
        'name': name        
    }
    let sql = `SELECT video_id, AVG(watchedperuser)
                 FROM (
                        SELECT DISTINCT user_ip, video_id, SUM(play_end - play_start) as watchedperuser
                          FROM userinfo
                         WHERE video_id = $1
                      GROUP BY user_ip, video_id
                 ) as totalaverage
             GROUP BY video_id`;
    dbUtil.sqlToDB(sql, data, function(err, result){
        if (err){
            logger.error(`getAverageWatchedPerVideo() error: ${err}`);  
            callback(err);
        } else {
            returnObj.result = result;
            callback(null, returnObj);
        }
    }); 
}

/* 
 * what browser / user agent was used per video
 * @param videoId
 * @return browsers
 */
module.exports.getUserAgentPerVideo = (videoId, callback) => {
    let type = 'browser';
    let name = 'Browser / User Agent Used per Video';
    let data = [ videoId ];
    let returnObj = {
        'type': type,
        'name': name        
    }
    let sql = `SELECT DISTINCT user_agent
                 FROM userinfo
                WHERE video_id = $1
             GROUP BY user_agent`;
    dbUtil.sqlToDB(sql, data, function(err, result){
        if (err){
            logger.error(`getAverageWatchedPerVideo() error: ${err}`);  
            callback(err);
        } else {
            returnObj.result = result;
            callback(null, returnObj);
        }
    }); 
}

/* 
 * segment of video that was most watched
 * @param videoId
 * @return play_start, play_end, mostwatched
 */
module.exports.getMostWatchedSegmentPerVideo = (videoId, callback) => {
    let type = 'most';
    let name = 'Most Watched Segment per Video';
    let data = [ videoId ];
    let returnObj = {
        'type': type,
        'name': name        
    }
    let sql = `SELECT DISTINCT play_start, play_end, COUNT(play_start) as mostwatched
                 FROM userinfo
                WHERE video_id = $1
             GROUP BY play_start, play_end
             ORDER BY mostwatched DESC
                LIMIT 5`;
    dbUtil.sqlToDB(sql, data, function(err, result){
        if (err){
            logger.error(`getMostWatchedSegmentPerVideo() error: ${err}`);  
            callback(err);
        } else {
            returnObj.result = result;
            callback(null, returnObj);
        }
    }); 
}
