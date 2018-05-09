/**
 * Created by bmqy on 2016/9/13.
 */

var doc = require('../index');
var crawler = require('crawler');


exports.infosArr = [];
exports.getInfo = function () {
    var urlArr = [];
    var _listDoc = doc.doc2arr;
    for (var i = 0; i < _listDoc.length; i = i + 2) {
        urlArr.push(_listDoc[i + 1]);
        // console.log(urlArr)
    }
    var j = 0;
    var art = new crawler({
        rateLimit: 200,
        jQuery: true,
        forceUTF8: true,
        skipDuplicates: true,
        maxConnections: 1,
        // This will be called for each crawled page
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                var $ = res.$;
                var _infoUnitJson = {};
                _infoUnitJson.href = urlArr[j];
                _infoUnitJson.title = $('.body_left .title').text();
                _infoUnitJson.content = $('.body_left .text').text().replace(/\r*\n*\t*/gi, '').substring(0, 100) + '...';
                exports.infosArr.push(_infoUnitJson);
                j++;
                // console.log(exports.infosArr);
                done();
            }

        }
    });
    art.queue(urlArr);
    // var gulpfile = require('./gulpfile');
};
exports.getInfo();
