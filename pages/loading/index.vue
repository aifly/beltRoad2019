<template>
	<transition name='loading'>
		<section v-if='show' class="lt-full zmiti-loading1" :style="{background:'#000 url('+imgs.loadingBg+') no-repeat center bottom',backgroundSize:'cover'}" >
			<div class='zmiti-index-logo'>
				<img :src="imgs.logo" alt="">
			</div>
			<div class='zmiti-loading-ui' v-if='!loaded && showLoading' >
				<div class='zmiti-loading-title'>女广播伴你一带一路，指尖上领略诗和远方</div>
				<div class='zmiti-loading-C'>
					<div class='zmiti-loading-bar'  :style="{webkitTransform:'scale('+(width*.93)+',1)'}">  </div>
					<img :style="{WebkitTransform:'translateX('+width*546+'px)'}" :src='imgs.loadingPlane' class='zmiti-loading-plane' />
				</div>
				<div class='zmiti-progress' >
					<span>{{parseInt(width*100)}}%</span>
				</div>
				
			</div>
		</section>
	</transition>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	export default {
		props:['width','obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				className:"",
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:true,
				loaded:false,
				showLoading:true,
				
			}
		},
		components:{
		},
		
		methods:{

		
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
			}
			
		},
		mounted(){
			
			this.obserable.on('hideloading1',()=>{
				
				setTimeout(() => {
					this.loaded = true;
					this.showLoading = false;
					this.show = false;
					this.obserable.trigger({
						type:'showMainPage'
					});
				}, 10/1);
			});
			



		}
	}
</script>