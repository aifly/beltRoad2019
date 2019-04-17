<template>
	<div  class="lt-full zmiti-choose-main-ui " :style="{background:'url('+imgs.chooseBg+') no-repeat center bottom',backgroundSize:'cover'}"   :class="{'show':show}">
		<div class="zmiti-index-logo">
			<img :src="imgs.logo" alt="">
		</div>

		<transition name='choose'>
			<div class='lt-full' v-show='showCountry'>
				<div class='zmiti-choose-top'>
					<div class="zmiti-choose-country" >
						<img :src="imgs.choose" alt="">
					</div>
					<div class='zmiti-choose-country-list' ref='country'>
						<div :style="{width:countrys1.length*178+'px'}">
							<ul :style="{width:countrys1.length*178+'px'}">
								<li  :class="{'active':currentCountry === i}" v-tap='[chooseCountry,i]' v-for='(item,i) in countrys1' :key="i">
									<div>
										<img :src="item.img" alt="">
									</div>
									<div>{{item.name}}</div>

								</li>
							</ul>
							<ul :style="{width:countrys2.length*130+'px'}">
								<li v-tap='[chooseCountry,i+countrys2.length]' v-for='(item,i) in countrys2' :key="i"  :class="{'active':currentCountry === i+countrys2.length}">
									<div>
										<img :src="item.img" alt="">
									</div>
									<div>{{item.name}}</div>

								</li>
							</ul>
						</div>
					</div>
					<div class="zmiti-go" v-press v-if='!showCountryDetail' v-tap='[goCountry]'>
						<img :src="imgs.go" alt="">
					</div>
					<div class='zmiti-go-next' v-show="showCountryDetail">
						<div v-press v-tap='[goCountry]'>
							<img  :src="imgs.see" alt="">
						</div>
						<div v-press v-tap='[toShare]'>
							<img :src="imgs.no" alt="">
						</div>
					</div>
				</div>
				<div class='zmiti-choose-bottom'>
					<div class='zmiti-plane1' v-if='!showCountryDetail' :class='{"active":showPlane1}'>
						<img :src="imgs.plane1" alt="">
					</div>

					<div class="zmiti-ticket" :style="{opacity:showCountry?1:0}">
						<canvas width='600' :style="{background:canvasBg?'url('+canvasBg+') no-repeat center center':'none'}" ref='canvas' height="240"></canvas>
						<div class='lt-full'>
							<h3>欢迎您搭乘本次“一带一路”号专机</h3>
							<div class='zmiti-ticket-info'>
								<div>北京</div>
								<div>
									<img :src="imgs.to" alt="">
								</div>
								<div>{{countrys[currentCountry]?countrys[currentCountry].name:''}}</div>
							</div>
							<div class='zmiti-ticket-place'>
								<div>出发地</div>
								<div>目的地</div>
							</div>
							<div class='zmiti-ticket-last'>“一带一路”专用机票</div>
						</div>
					</div>
				</div>
			</div>
		</transition>

		<transition name='detail'>
			<div class='zmiti-country-detail' v-if='showCountryDetail'>
				<transition name='country'>
					<div class='lt-full' v-if='i === currentCountryObj.index' v-for='(bg,i) in currentCountryObj.cityImgs' :key="i" :style="{background:'url('+bg+') no-repeat center bottom',backgroundSize:'cover'}"></div>
				</transition>
				<div class='zmiti-country-name' v-if='!showCountry'>
					<img :src="imgs.countryTop" alt="">
					<div>{{currentCountryObj.name}}</div>
				</div>

				<div class='zmiti-country-detail-btns' v-show='!showCountry'>
					<div v-press v-tap='[goNextCountry]'>
						<img :src="imgs.next" alt="">
					</div>
					<div v-press v-tap='[toShare]'>
						<img :src="imgs.goback" alt="">
					</div>
				</div>
			</div>
		</transition>
		<div class='zmiti-zhubo'>
			<img :src="imgs.zhubo" alt="">
		</div>
		<div class='zmiti-broadcast'>
			<div class='zmiti-xiaomeng'>
				<img :src="imgs.xiaomeng" alt="">
			</div>

			<div class='zmiti-broadcast-content'>
				<span :style="{WebkitAnimationDuration:(currentCountryObj.daoyu||daoyu).length/20+'s'}">{{currentCountryObj.daoyu||daoyu}}</span>
			</div>
		</div>

		<div class=' zmiti-project' v-if='!showCountry && currentCountryObj.project' v-tap='[playVideoByFirst]'>
			<span>中哈合作项目</span> 去看看>>
		</div>


		<div class='zmiti-video lt-full' v-if='currentCountryObj.project' v-show='showVideo' v-tap='[playVideoByFirst]'  >
			<video x-webkit-airplay="allow"  webkit-playsinline="true" playsinline preload='auto'
				x5-video-player-type="h5" :x5-video-player-fullscreen="true" 
				 :poster='currentCountryObj.project.poster'
				 
				ref='video' :style="{display:showVideo?'block':'none',zIndex:showVideo?1000:-1,width:videoWidth,height:'100%'}"  :src="currentCountryObj.project?currentCountryObj.project.video:''"></video>
				<div class='zmiti-video-btns' v-if='showVideo'>
					<div class='zmiti-nextstation' v-press :style="{opacity:(isPlaying === false && isPlaying !== -1) ? 1:0}">
						<img :src="imgs.nextstation" alt="" />
					</div>
					<div class='zmiti-longtap '  @touchstart='playVideo' @touchend='pauseVideo'  v-press >
						<img :src="imgs[!isPlaying?'longtap':'continue']" alt="">
					</div>
					<div class='zmiti-exit' v-tap='[exit]' :style="{opacity:(isPlaying === false && isPlaying !== -1) ?1:0}">
						<img :src="imgs.exit" alt="" />
					</div>



				</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util'; 
	import IScroll from 'iscroll';
	const len = window.config.countryList.length;

	export default {
		props:['obserable','pv'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				daoyu:window.config.daoyu,
				show:false,
				canvasBg:"",
				showVideo:false,
				currentCountry:-1,
				videoWidth:window.innerWidth+'px',
				showPlane1:false,
				countrys:window.config.countryList.slice(0),
				countrys1:window.config.countryList.slice(0,len/2),
				countrys2:window.config.countryList.slice(len/2),
				viewW:document.documentElement.clientWidth,
				showBtns:false,
				viewH:document.documentElement.clientHeight,
				viewCountrys:[],
				isPlaying:-1,
				currentCountryObj:{
					index:0
				},
				showCountry:true,
				showCountryDetail:false

			}
		},
		components:{
		},
		watch:{
			showCountry(){
				this.initTicket();
			}
		},
		
		methods:{

		    exit(){
				setTimeout(() => {
					this.showVideo = false;
					this.pauseVideo();
				}, 100);
			},

			playVideoByFirst(){
				this.playVideo();

				setTimeout(() => {
					this.pauseVideo();
					this.isPlaying = -1;
				}, 1000);
			},

			playVideo(e){
				this.showVideo = true;
				this.$refs['video'] && this.$refs['video'].play();
				this.isPlaying = true;
				
			},
			pauseVideo(){

				this.$refs['video'] &&this.$refs['video'].pause();
				this.isPlaying = false;
			},

			chooseCountry(index){
				this.currentCountry = index;
				
				
			},
			goCountry(){
				if(this.currentCountry <= -1){
					return;
				}
				
				this.showCountryDetail = true;
				this.showCountry = false;
				this.currentCountryObj = Object.assign(this.currentCountryObj,window.config.countryList[this.currentCountry]);
				var isSame = false;
				this.viewCountrys.forEach((item)=>{ 
					if(this.currentCountryObj.name === item.name){
						isSame = true;
					}
				})
				!isSame && this.viewCountrys.push(JSON.parse(JSON.stringify(this.currentCountryObj)));
				
			},

			goNextCountry(){
				this.showCountry = true;
				this.initTicket();
			},
		
			imgStart(e){
				e.preventDefault();
			},
		

			share(){
				this.showMasks = true
			},

			toShare(){
				this.obserable.trigger({
					type:'showSharePage',
					data:this.viewCountrys
				});
			},
			initTicket(){
				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');
				var lingrad = context.createLinearGradient(0,0,0,canvas.height);
				lingrad.addColorStop(0,'#067cc1');
				lingrad.addColorStop(1,'#057ec2');
				context.fillStyle = lingrad;
				context.fillRect(0,0,canvas.width,canvas.height);
				context.globalCompositeOperation = 'xor';
				var r = 30;
				context.fillStyle = 'red';
				context.beginPath();
				context.arc(0,canvas.height,r,0,Math.PI*2,false);
				context.fill();

				context.fillStyle = 'red';
				context.beginPath();
				context.arc(canvas.width,canvas.height,r,0,Math.PI*2,false);
				context.fill();

				!this.canvasBg && (this.canvasBg = canvas.toDataURL());
			}

			
			
			
		},
		mounted(){
			this.initTicket();

			this.obserable.on("showChoosePage",()=>{
				this.show = true;
				this.scroll = new IScroll(this.$refs['country'],{
					scrollX:true
				});

				this.showPlane1 = true;

				this.obserable.trigger({
					type:"playVoice",
					data:'plane'
				})

				var bgratio = 1080/1920;
				if((innerWidth/innerHeight)<=9/16){
					this.videoWidth = parseInt(bgratio*innerHeight)+'px';
					this.videoHeight = window.innerHeight+'px';
					
				}else{
					this.videoWidth = window.innerWidth+'px';
					this.videoHeight = parseInt(innerWidth/bgratio)+'px';
				}
				clearInterval(this.countryTimer);
				this.countryTimer = setInterval(() => {
					if(this.currentCountryObj.name){
						this.currentCountryObj.index++;
						this.currentCountryObj.index %= this.currentCountryObj.cityImgs.length;
					}
				}, 4000);

				this.obserable.on('clearCountry',()=>{
					this.viewCountrys.length = 0;
					this.show = true;
				})
			})


			
		}
	}
</script>