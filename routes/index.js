var express = require('express');
var axios= require("axios");
var router = express.Router();
/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/proxy', function(req, res, next){
    var bodyData={list: [{
            DataSource: 2,
            active: 1,
            calories: 0.12,
            created: new Date().format("yyyy-MM-dd hh:mm:ss"),
            dataSource: 2,
            dayMeasurementTime: new Date().format("yyyy-MM-dd"),
            deviceId: "M_NULL",
            distance: 51,
            exerciseTime: 0,
            id: "",//抓取的id
            isUpload: 0,
            measurementTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
            priority: 0,
            step: Number(req.body.bushu),
            type: 2,
            updated: new Date().getTime(),
            userId: ""//抓取的userId
        }]};
    var url="https://sports.lifesense.com/sport_service/sport/sport/uploadMobileStepV2?country=%E4%B8%AD%E5%9B%BD&city=%E6%88%90%E9%83%BD&cityCode=510100&timezone=Asia%2FShanghai&latitude=30.570562&os_country=CN&channel=xiaomi&language=zh&openudid=&platform=android&province=%E5%9B%9B%E5%B7%9D%E7%9C%81&appType=6&requestId=6fe218d80aa74c59b66c4725e9bc13ec&countryCode=&systemType=2&longitude=104.062329&devicemodel=MI+9&area=CN&screenwidth=1080&os_langs=zh&provinceCode=510000&promotion_channel=xiaomi&version=4.5&areaCode=510107&network_type=wifi&osversion=10&screenheight=2135";
    //url是接口地址，以抓取到的为准
    axios.post(url,bodyData,{
        headers:{
            "Cookie": "",//以抓取到的为准
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 10; MI 9 MIUI/V11.0.5.0.QFACNXM)",//这里涉及手机型号，请以抓取到的为准
            "Host": "sports.lifesense.com",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "Content-Length": "352",
        },
    }).then(function(succ){
        console.log(succ.data);//处理成功的函数 相当于success
        res.send(succ.data)
    }).catch(function(error){
        console.log(error)//错误处理 相当于error
        res.send(error)
    })

});
module.exports = router;
