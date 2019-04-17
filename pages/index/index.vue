<template>
	<transition name='index'>
		<section v-if='show' class="lt-full zmiti-index"  :style="{background:'url('+imgs.indexBg+') no-repeat center bottom',backgroundSize:'cover'}" >
			<div class='zmiti-index-logo'>
				<img :src="imgs.logo" alt="">
			</div>


			<div class='zmiti-cloud' :class="{'active':!showMain}">
				<img :src="imgs.cloud" alt="">
			</div>
		

			<transition name='main'>
				<div class='zmiti-index-main' v-if='showMain'>
					<div class='zmiti-index-start' v-press v-tap='[entryMain]'>
						<img :src="imgs.startBtn" alt="">
					</div>
					<div class='zmiti-index-map zmiti-index-map2'>
						<img :src="imgs.map" alt="">
					</div>
					<div class='zmiti-index-map1 zmiti-index-map'>
						<img :src="imgs.map1" alt="">
					</div>
					<div class='zmiti-index-title'>
						<img :src="imgs.title" alt="">
					</div>
				</div>
			</transition>

			<transition name='remark'>
				<div class="zmiti-main-remark" v-if='!showMain' v-tap='[entryChoose]'>
					<img :src="imgs.remark" alt="">
				</div>
			</transition>



			<div class='zmiti-index-earth' :class="{'active':!showMain}">
				<img :src="imgs.earth" alt="">
			</div>
			<div class='zmiti-index-plane' :class="{'active':!showMain}">
				<img :src="imgs.plane" alt="">
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
				viewW:Math.min(window.innerWidth,750),
				viewH:window.innerHeight,
				show:true,
				showMain:true,
				text:[]
			}
		},
		components:{
		},
		
		methods:{
			entryMain(){
				this.showMain = false;
				this.obserable.trigger({
					type:'playVoice',
					data:'plane'
				});

				setTimeout(() => {
					this.entryChoose();
				}, 6000);
			},
			entryChoose(){
				this.show = false;
				this.obserable.trigger({
					type:"showChoosePage"
				})
			}
			
		},
		mounted(){
			var {obserable} = this;

			setTimeout(() => {
				// 
			}, 100);
		}
	}
</script>	 