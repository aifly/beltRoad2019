<template>
	<transition name='loading'>
		<section v-if='show'  class="lt-full zmiti-share-main-ui" :style="{background:'url('+imgs.shareBg+') no-repeat left bottom ',backgroundSize:'cover'}" >
			
			<div class='zmiti-mask' v-if='showMask' @touchstart='showMask = false'>
				<img :src="imgs.arrow" alt="">
			</div>
			<div class='zmiti-share-point'>
				<img :src="imgs.sharePoint" alt="">
			</div>
			<div  class='zmiti-point-C' v-for="(point,i) in countryPosition" :key="i"  :style="{left:point.x+'px',bottom:point.y+'px'}">
				<div  :style="{color:countryList.length/2>i?'#fff':'yellow'}">{{countryList[i].name}}</div>
			</div>
		</section>
	</transition>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	import Point from '../lib/point';
	//import '../lib/html2canvas';
	var countryPosition = [
		{
			x:430,
			y:540
		},
		{
			x:234,
			y:530
		},
		{
			x:144,
			y:908
		},
		{
			x:454,
			y:860
		}, 
		{
			x:190,
			y:754
		},
		{
			x:340,
			y:740
		},
		{
			x:500,
			y:745
		},
		{
			x:150,
			y:640
		},
		{
			x:250,
			y:630
		},
		{
			x:540,
			y:620
		},
		{
			x:325,
			y:454
		},
		{
			x:260,
			y:350
		},
		{
			x:170,
			y:244
		},
		{
			x:280,
			y:200
		},
		{
			x:470,
			y:260
		},
		{
			x:550,
			y:380
		}
	];
	export default {
		props:['width','obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				className:"",
				showAudio:false,
				showMask:false,
				countryList:window.config.countryList,
				isAndroid:navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
				showQrcode:false,
				countryPosition,//:window.config.countryPosition,
				showSharePage:false,
				matchMoved:false,
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:true,
			}
		},
		components:{
		},
		watch:{
			
		},
		
		methods:{


			imgClick(){
			},


			restart(){
				this.matchStyle={
					left:'200px',
					top:window.innerHeight*.6+'px',
					zIndex:201
					
				};
				this.light = true;
				this.showSharePage = false;
				this.createImg = '';
				this.showMatch = true;
				this.isPlaying = false;
				this.hideShadow = false;
				this.matchMoved = false;
				this.showCandle1 = false;
				this.showMask = false;
				this.showFlame = false;
				this.showCandle = false;
				this.showAudio = false;
				this.showQrcode = false;
				setTimeout(()=>{
					this.light = false;
				},100)
				this.randomIndex = Math.random()*3|0;
				this.updatePv();


			},


			showMaskPage(){
				this.showMask = true;
			},

			

		
			imgStart(e){
				e.preventDefault(); 
			},
			entryIndex(){
				clearInterval(this.timer);
				this.obserable.trigger({
					type:'toggleBgMusic',
					data:true
				});
				this.show = false;
				clearInterval(this.t);
				this.obserable.trigger({
					type:'showIndexTitle'
				})
			},
			updatePv(){
				var s = this;

                axios.post('http://h5.wenming.cn/v1/wmshare/h5_view/?h5id=ypb-qmj&appsecret=c9GxtUre3kOJCgvp&sign=1', {})
				.then(function (data) {//sign:2 表示两位数随机
                        var dt = data.data;
						if(dt.getret === 0){
							s.pv = dt.data.num1;
							console.log(dt.data)
							//wxHandlercallback('','请为英烈点燃第'+s.pv+'盏灯');
							
						}
                    });

 				axios.post('https://xlive.xinhuaapp.com/xhs-security-activity/activity/num/updateNum', {
                        "secretKey": window.config.secretKey, // 请求秘钥
                        "nm": "ypb-qmj" // 
                    }).then(function (data) {
                        var dt = data.data;
                        if (typeof dt === 'string') {
                            dt = JSON.parse(dt);
                        }
                    });

				return;
               
 
			},
			getPv(){
				return;
				var s = this;
                axios.post('https://xlive.xinhuaapp.com/xhs-security-activity/activity/num/updateNum', {
                        "secretKey": window.config.secretKey, // 请求秘钥
                        "nm": "light" // 活动某组图片点赞标识 或者活动某组图片浏览量标识 标识由更新接口定义
                    }).then(function (data) {
                        console.log(data,'11111234');
                        var dt = data.data;
                        if (typeof dt === 'string') {
                            dt = JSON.parse(dt);
                        }
                    });
			},
			html2img(ref = 'page1'){
				var s = this;
				var {obserable} = this;

				window.ss = this;

				//document.title = '开始截图....'
				this.hideShadow = true;
				this.showQrcode = true;
				this.showCandle1 = true;
				this.showAudio = false;

				obserable.trigger({
					type:'playVoice',
					data:'photo'
				});

				this.creatCanvas();

				return;

				/*  */
 
				setTimeout(()=>{
					//this.showLoading = true;
					var dom = this.$refs[ref];
					
					/* html2canvas(dom,{
						useCORS: true,
						onrendered: function(canvas) {
					        var src = canvas.toDataURL();
							//s.mergeImg = '';
							//s.createImg = src;
							
							if(!s.isAndroid){
								obserable.trigger({
									type:'playVoice',
									data:'photo'
								});
							}
							
							s.createImg = src;
					      },
					      width: dom.clientWidth,
					      height:dom.clientHeight
					}) */
				},100);
			},
			
		},
		mounted(){
		}
	}
</script>