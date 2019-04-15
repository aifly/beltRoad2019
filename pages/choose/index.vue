<template>
	<div  class="lt-full zmiti-choose-main-ui " :style="{background:'url('+imgs.chooseBg+') no-repeat center bottom',backgroundSize:'cover'}"   :class="{'show':show}">
		<div class="zmiti-index-logo">
			<img :src="imgs.logo" alt="">
		</div>
		<div class='zmiti-choose-top'>
			<div class="zmiti-choose-country">
				<img :src="imgs.choose" alt="">
			</div>
			<div class='zmiti-choose-country-list' ref='country'>
				<div :style="{width:countrys1.length*130+'px'}">
					<ul :style="{width:countrys1.length*130+'px'}">
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
			<div class="zmiti-go">
				<img :src="imgs.go" alt="">
			</div>
		</div>
		<div class='zmiti-choose-bottom'>
			<div class='zmiti-plane1'>
				<img :src="imgs.plane1" alt="">
			</div>

			<div class="zmiti-ticket">
				<canvas width='550' ref='canvas' height="240"></canvas>
				<div class='lt-full'>
					<h3>欢迎您搭乘本次“一带一路”号专机</h3>
					<div class='zmiti-ticket-info'>
						<div>北京</div>
						<div>
							<img :src="imgs.to" alt="">
						</div>
						<div>{{currentCountryObj.name}}</div>
					</div>
					<div class='zmiti-ticket-place'>
						<div>出发地</div>
						<div>目的地</div>
					</div>
					<div class='zmiti-ticket-last'>“一带一路”专用机票</div>
				</div>
			</div>


			<div class='zmiti-broadcast'>
				<div class='zmiti-xiaomeng'>
					<img :src="imgs.xiaomeng" alt="">
				</div>

				<div class='zmiti-broadcast-content'>
					尊敬的旅客您好！
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
				show:true,
				currentCountry:-1,
				countrys1:window.config.countryList.slice(0,len/2),
				countrys2:window.config.countryList.slice(len/2),
				viewW:document.documentElement.clientWidth,
				showBtns:false,
				viewH:document.documentElement.clientHeight,
				currentCountryObj:{}

			}
		},
		components:{
		},
		
		methods:{

			chooseCountry(index){
				this.currentCountry = index;
				this.currentCountryObj = window.config.countryList[index]
				
			},
		
			imgStart(e){
				e.preventDefault();
			},
		

			share(){
				this.showMasks = true
			},
			initTicket(){
				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');
				var lingrad=context.createLinearGradient(0,0,0,canvas.height);
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
			}

			
			
			
		},
		mounted(){

			this.scroll = new IScroll(this.$refs['country'],{
				scrollX:true
			});
			this.initTicket();
		}
	}
</script>