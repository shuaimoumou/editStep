wx/zfb修改步数工具。
项目为express框架，下载后修改router/index.js   运行  npm install 
启动 node bin/www
访问localhost:1000即可访问


此方法简单易懂，技术成本低，大体思路就是利用抓包工具抓取运动软件同步微信步数接口，通过模拟数据来请求微信，达到修改目的。
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
写了个简单的页面来调用
输入步数，提交成功！
5.查看修改结果
