前段时间，看到微信运动上有各种大神一天几万步的，尤其是那些背景图自带嘲讽的占领了微信封面。就在想：“你们整天不睡觉么”？然后好奇的我，在搜索引擎上各种爬梯子，终于找到了一款网页刷步工具运动宝盒刷步数，很可惜，就用了一次就失效了，话说作为菜鸟程序员出身的我，当然不能忍。
以上都是废话，进入正题，此方法简单易懂，技术成本低，大体思路就是利用抓包工具抓取运动软件同步微信步数接口，通过模拟数据来请求微信，达到修改目的。
工具：
1.抓包工具（就用常用的Flidder）怎么用的话 可以百度 https://blog.csdn.net/ohmygirl/article/details/17846199 
2. 运动软件 （就先拿乐心健康做案例，其实市面上的软件都大同小异）
方法：
1.下载乐心健康app
2.注册 登录 数据共享关联微信 支付宝
3.开启flidder抓取接口
我们摆几下手，就能看到有一条数据同步的接口，点击查看
step就是我们要同步上传的步数，OK 大功告成
4.模拟接口运行 
关于模拟接口，有各种模拟办法，我们就用最简单的js来做吧，随便用个express搭个服务器写个接口就行，其中填入自己抓的数据值到对应字段里
[mw_shl_code=javascript,true]router.post('/proxy', function(req, res, next){
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
id: "输入您抓取的对应的id",
isUpload: 0,
measurementTime: new Date().format("yyyy-MM-dd hh:mm:ss"),
priority: 0,
step: Number(req.body.bushu),//这里就是您要同步的步数
type: 2,
updated: new Date().getTime(),
userId: "输入您抓取的userId"
}]};
var url="输入您抓取的接口地址“;
/*接口地址会加杂一些参数，依据实际情况填入即可，例如”https://sports.lifesense.com/sport_service/sport/sport/uploadMobileStepV2?country=%E4%B8%AD%E5%9B%BD&city=%E6%88%90%E9%83%BD&cityCode=510100&timezone=Asia%2FShanghai&latitude=30.570562&os_country=CN&channel=xiaomi&language=zh&openudid=&platform=android&province=%E5%9B%9B%E5%B7%9D%E7%9C%81&appType=6&requestId=6fe218d80aa74c59b66c4725e9bc13ec&countryCode=&systemType=2&longitude=104.062329&devicemodel=MI+9&area=CN&screenwidth=1080&os_langs=zh&provinceCode=510000&promotion_channel=xiaomi&version=4.5&areaCode=510107&network_type=wifi&osversion=10&screenheight=2135"*/

axios.post(url,bodyData,{
headers:{
"Cookie": "Cookie值",
"Content-Type": "application/json; charset=utf-8",
"User-Agent": "Dalvik/2.1.0 (Linux; U; Android 10; MI 9 MIUI/V11.0.5.0.QFACNXM)",//这里有涉及手机型号
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
})[/mw_shl_code]
写了个简单的页面来调用
输入步数，我们测试一下，25133 提交成功！
5.查看修改结果
当然，这个只能修改你抓到的账户哈！简单的js接口，源码地址：https://github.com/shuaimoumou/editStep.git， 仅供学习！转载请注明出处哈，当然你不写我也没话说！
