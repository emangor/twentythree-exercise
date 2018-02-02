const logger = require('../utils/logger');
const readModel = require('../models/model-read');


module.exports.getInfoPerVideo = function(req, res){
    let modules = typeof req.query.modules !== 'undefined' ? req.query.modules : '';
    if (modules === '') {
        modules = 'usercount,average,most,browser';
    }
    let modulesArray = modules.split(',');
    let videoId = req.params.videoId;
    let promises = [];

    //build promises array
    for (let i = 0; i < modulesArray.length; i++){
        switch (modulesArray[i]){
            case 'usercount':
                promises.push(getUserCountPerVideo(videoId));
                break;
            case 'average':
                promises.push(getAverageWatchedPerVideo(videoId));
                break;
            case 'browser':
                promises.push(getUserAgentPerVideo(videoId));
                break;
            case 'most':
                promises.push(getMostWatchedSegmentPerVideo(videoId));
                break;                
            default:
                logger.error(`Unexpected value in building promise array: ${modulesArray[i]}`);
        }
    }
    Promise.all(promises)
    .then(function(result) {
        res.status(200).json(result);
    })
    .catch(function(err){
        res.status(500).json(err);
    });     
} 

//user count per video
function getUserCountPerVideo (videoId) {
    return new Promise(function(resolve, reject) {
        readModel.getUserCountPerVideo(videoId, function(err, result){
            if(err){
                logger.error(`getUserCountPerVideo error: ${err}`);
                reject(err);
            } else {                
                resolve(result);
            }
        });
    });
}

//average seconds watched per video
function getAverageWatchedPerVideo (videoId) {
    return new Promise(function(resolve, reject) {
        readModel.getAverageWatchedPerVideo(videoId, function(err, result){
            if(err){
                logger.error(`getAverageWatchedPerVideo error: ${err}`);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//average seconds watched per video
function getUserAgentPerVideo (videoId) {
    return new Promise(function(resolve, reject) {
        readModel.getUserAgentPerVideo(videoId, function(err, result){
            if(err){
                logger.error(`getUserAgentPerVideo error: ${err}`);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//most watched segment per video
function getMostWatchedSegmentPerVideo (videoId) {
    return new Promise(function(resolve, reject) {
        readModel.getMostWatchedSegmentPerVideo(videoId, function(err, result){
            if(err){
                logger.error(`getMostWatchedSegmentPerVideo error: ${err}`);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
