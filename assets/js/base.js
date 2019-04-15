﻿window.imgs = {
	logo: "./assets/images/logo.png",
	play: "./assets/images/play2.png",
	arrow: "./assets/images/arrow.png",
	plane1: "./assets/images/plane1.png",
	plane: "./assets/images/plane.png",

	aiji: "./assets/images/aiji.png",
	baieluosi: "./assets/images/baieluosi.png",
	bolan: "./assets/images/bolan.png",
	eluosi: "./assets/images/eluosi.png",
	litaowan: "./assets/images/litaowan.png",
	menggu: "./assets/images/menggu.png",
	taiguo: "./assets/images/taiguo.png",
	yidali: "./assets/images/yidali.png",
	xila: "./assets/images/xila.png",
	yuenan: "./assets/images/yuenan.png",
	tuerqi: "./assets/images/tuerqi.png",
	sililank: "./assets/images/sililank.png",
	yilang: "./assets/images/yilang.png",
	shatealabo: "./assets/images/shatealabo.png",
	hasakesitan: "./assets/images/hasakesitan.png",
	maerdaifu: "./assets/images/maerdaifu.png",

	hasakesitan_1: "./assets/images/hasakesitan_1.jpg",
	
	
	cloud: "./assets/images/cloud.png",
	goback: "./assets/images/goback.png",
	next: "./assets/images/next.png",
	restart: "./assets/images/restart.png",
	zhubo: "./assets/images/zhubo.png",
	to: "./assets/images/to.png",
	go: "./assets/images/go.png",
	remark: "./assets/images/remark.png",
	xiaomeng: "./assets/images/xiaomeng.png",
	title: "./assets/images/title.png",
	earth: "./assets/images/earth.png",
	ticket: "./assets/images/ticket.png",
	choose: "./assets/images/choose.png",
	qrcode: "./assets/images/qrcode.png",
	map: "./assets/images/map.png",
	loadingPlane: "./assets/images/loading-plane.png",
	startBtn: "./assets/images/start-btn.png",
	indexBg: "./assets/images/index-bg.jpg",
	chooseBg: "./assets/images/choose-bg.jpg",
	shareBg: "./assets/images/share-bg.jpg",
	loadingBg: "./assets/images/loading-bg.jpg",
	
};


 
 
var arr = [];
 
 
for (var attr in imgs) {
	arr.push(imgs[attr]);
}

 window.config = {
	audio1:'./assets/music/audio1.mp3',
	audio2:'./assets/music/audio2.mp3',
	photo:'./assets/music/photo.mp3',
	audio3:'./assets/music/audio3.mp3',
   	baseUrl: "https://testxlive.xinhuaapp.com",
   	host:"https://xlive.xinhuaapp.com", //正式域名：https://testxlive.xinhuaapp.com
   	secretKey: "e9469538b0623783f38c585821459454",
	   
	countryList: [{
		name: '蒙古',
		img: imgs.menggu,
		cityImgs:[],
		position:[600,680]
	}, {
		name: '哈萨克斯坦',
		img: imgs.hasakesitan,
		cityImgs: [imgs.hasakesitan_1],
		position:[350,740]
	}, {
		name: '俄罗斯',
		img: imgs.eluosi,
		cityImgs:[],
		position:[190,770],
		inline: true
	}, {
		name: '白俄罗斯',
		img: imgs.baieluosi,
		cityImgs:[],
		position: [120, 750],
		inline:true
		
	}, {
		name: '立陶宛',
		img: imgs.litaowan,
		cityImgs: [],
		position: [60, 790]
	}, {
		name: '波兰',
		img: imgs.bolan,
		cityImgs: [],
		position: [70, 700]
	}, {
		name: '意大利',
		img: imgs.yidali,
		cityImgs: [],
		position: [0, 630],
	}, {
		name: '希腊',
		img: imgs.xila,
		cityImgs: [],
		position: [100, 610],
	}, {
		name: '越南',
		img: imgs.yuenan,
		cityImgs:[]
	}, {
		name: '泰国',
		img: imgs.taiguo,
		cityImgs:[]
	}, {
		name: '伊朗',
		img: imgs.yilang,
		cityImgs:[]
	}, {
		name: '埃及',
		img: imgs.aiji,
		cityImgs:[]
	}, {
		name: '马尔代夫',
		img: imgs.maerdaifu,
		cityImgs:[]
	}, {
		name: '沙特阿拉伯',
		img: imgs.shatealabo,
		cityImgs:[]
	}, {
		name: '土耳其',
		img: imgs.tuerqi,
		position: [0, 630],
		cityImgs:[]
	}, {
		name: '斯里兰卡',
		img:imgs.sililank,
		cityImgs:[]
	}]
 };
 
  
var musics = {
	music: {
		src: './assets/music/bg3_1.mp3',
		autoplay: 'autoplay',
		name: 'bg2',
		loop: true
	},
   
	 photo: {
	 	src: './assets/music/photo.mp3',
	 	autoplay: 'autoplay',
	 	name: 'photo',
	 },
	/*  audio1: {
	 	src: './assets/music/audio1.mp3',
	 	autoplay: 'autoplay',
	 	name: 'audio1',
	 },
	 audio2: {
	 	src: './assets/music/audio2.mp3',
	 	autoplay: 'autoplay',
	 	name: 'audio2',
	 },
	 audio3: {
	 	src: './assets/music/audio3.mp3',
	 	autoplay: 'autoplay',
	 	name: 'audio3',
	 } */
};

 (function () {

 	if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
 		handleFontSize();
 	} else {
 		if (document.addEventListener) {
 			document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
 		} else if (document.attachEvent) {
 			document.attachEvent("WeixinJSBridgeReady", handleFontSize);
 			document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
 		}
 	}

 	function handleFontSize() {
 		// 设置网页字体为默认大小
 		WeixinJSBridge.invoke('setFontSizeCallback', {
 			'fontSize': 0
 		});
 		// 重写设置网页字体大小的事件
 		WeixinJSBridge.on('menu:setfont', function () {
 			WeixinJSBridge.invoke('setFontSizeCallback', {
 				'fontSize': 0
 			});
 		});
 	}
 })();