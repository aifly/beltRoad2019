<template>
	<transition name='loading'>
		<section v-if='show'  class="lt-full zmiti-share-main-ui" :class='{"active":createImg}'>
			<div  class='lt-full' ref='page1' :style="{WebkitFilter:'blur('+(createImg?'10px':0)+')',background:'url('+imgs.shareBg+') no-repeat left bottom ',backgroundSize:'cover'}" >
				<div class='zmiti-share-title'>
					<img :src="imgs.shareTitle" alt="">
					<span>{{countryList.length}}</span>
				</div>
				<div class="zmiti-index-logo">
					<img :src="imgs.logo" alt="">
				</div>
				
				<div class='zmiti-share-point'>
					<img :src="imgs.sharePoint" alt="">
				</div>
				<div  class='zmiti-point-C' v-for="(point,i) in countryPosition" :key="i"  :style="{left:point.x+'px',bottom:point.y+'px'}">
					<div >{{countryList[i]?countryList[i].name:''}}</div>
				</div>
			</div>

			<transition name='create'>
				<div class='zmiti-createimg lt-full' v-if="createImg">
					<img :src="createImg" alt="" />
					<span>长按保存图片</span>
				</div>
			</transition>

			<transition name='create'>
				<div class='zmiti-share-btns' v-if="createImg">
					<div v-press v-tap='[showMaskPage]'><img :src="imgs.invite" alt=""></div>
					<div v-press v-tap='[restart]'><img :src="imgs.restart" alt=""></div>
				</div>
			</transition>

			<div class='zmiti-mask' v-if='showMask' @touchstart='showMask = false'>
				<img :src="imgs.arrow" alt="">
			</div>

		</section>
	</transition>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	import Point from '../lib/point';
	import '../lib/html2canvas';
	var countryPosition = [
		
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
				countryList:[],
				isAndroid:navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
				showQrcode:false,
				countryPosition:window.config.countryPosition,
				showSharePage:false,
				matchMoved:false,
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:false,
				createImg:''
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
				
				this.showSharePage = false;
				this.createImg = '';
				this.show = false;

				this.obserable.trigger({
					type:'clearCountry'
				})

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
				setTimeout(()=>{
					//this.showLoading = true;
					
					var dom = this.$refs[ref];
					html2canvas(dom,{
						useCORS: true,
						onrendered: function(canvas) {
					        var src = canvas.toDataURL();
							//s.mergeImg = '';
							//s.createImg = src;
							s.createImg = src;
							
					      },
					      width: dom.clientWidth,
					      height:dom.clientHeight
					})
				},100)

 
			},
			
		},
		mounted(){
			this.obserable.on('showSharePage',(data)=>{
				this.show = true;
				setTimeout(() => {
					this.countryList = data;
				}, 1);

				window.wxHandlercallback('','我与AI主播同游了'+data.length+'个国家',document.title);
				setTimeout(() => {
					this.html2img();
				}, 1000);
			})

			
		}
	}
</script>