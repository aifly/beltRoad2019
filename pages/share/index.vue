<template>
	<transition name='loading'>
		<section v-if='show'  class="lt-full zmiti-share-main-ui" :class='{"active":createImg}'>
			<div  class='lt-full' ref='page1' >
				<div class="lt-full" :style="{WebkitFilter:'blur('+(createImg?'20px':0)+')',background:'url('+countryList.clipImg+') no-repeat left bottom ',backgroundSize:'cover'}" >

				</div>
				<div class="zmiti-share-title">
					<img :src="imgs.shareTitle" alt="">
				</div>
				<div class='zmiti-card-name'>
					{{countryList.name}}
				</div>


				<div class='zmiti-card-C'>
					<div class='zmiti-logo1'>
						<img :src="imgs.logo1" alt="">
						<div class='zmiti-share-poster'>
							<span v-for='(span,i) in [1,0,0,0,0,0]' :key="i">
								{{span}}
							</span>
						</div>
					</div>

					<div class='zmiti-share-text'>
						 即刻分享沿途美丽风景，邀请好友一同打卡！
					</div>

					<div class='zmiti-date'>
						{{date}}
					</div>

					<div class='zmiti-qrcode'>
						<img :src="imgs.qrcode" alt="">
					</div>

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
			<audio :src='end' ref='audio'></audio>
		</section>
	</transition>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	import Point from '../lib/point';
	import '../lib/html2canvas';
	var countryPosition = [];
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
				end:window.config.end,
				isAndroid:navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1,
				showQrcode:false,
				date:"",
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
				this.$refs['audio'].pause();
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
				this.countryList = data.pop();
				this.show = true;
				setTimeout(() => {
					this.$refs['audio'].play();
				}, 1);

				window.wxHandlercallback('','我和新小萌一起打卡了'+data.length+'个国家',document.title);
				setTimeout(() => {
					this.html2img();
				}, 1000);
			})

		/* 	this.obserable.trigger({
				type:"showSharePage",
				data:window.config.countryList
			}) */

			var D = new Date();
			var year = D.getFullYear();
			var month = D.getMonth()+1;
			var day = D.getDate();

			month = month<10 ? '0' + month : month;

			this.date = [year,month,day].join('-');
			
		}
	}
</script>