import Vue from "vue";
import './pages/css/index.css';
import Index from './pages/index/index';
import Choose from './pages/choose/index';
import Share from './pages/share/index';
import Loading from './pages/loading/index';
import Music from './pages/music/index';
import Obserable from './pages/lib/obserable';

import zmitiUtil from './pages/lib/util'
import './pages/lib/touch.js'
import vueTap from 'vue-js-tap';
Vue.use(vueTap);


//var VueTouch = im('vue-touch')
/*import VueTouch from 'vue-touch';
Vue.use(VueTouch, {name: 'v-touch'})*/



var obserable = new Obserable();


//Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	data: {
		obserable,
		rotate: false,
		imgs:window.imgs,
		showMask: false,
		viewH: document.documentElement.clientHeight,
		isShare: false,
		show: false,
		username: '',
		pv:820121,
		width:0,
		loaded: false,
		nickname: '',
		headimgurl: '',

		playStyle: {

		}
	},
	el: '#app',
	/*<audio ref='audio' src='./assets/music/bg.mp3'  loop></audio>

		<audio src='./assets/music/water.mp3' ref='water'></audio>
		<audio src='./assets/music/photo.mp3' ref='photo'></audio>
		<audio src='./assets/music/bg.mp3' ref='audio'></audio>
		<Main :pv='pv' :nickname='nickname' :headimgurl='headimgurl'  v-if='show && !isShare'  :obserable='obserable'></Main>
		<Upload :pv='pv' :nickname='nickname' :headimgurl='headimgurl'   v-if='show && !isShare'  :obserable='obserable'></Upload>
		<Loading v-if='!show' :width='width' :obserable='obserable'></Loading>
		
		*/
		template: `<div id='app1'>
		<Music :obserable='obserable'></Music>
		<Loading :width='width' :obserable='obserable'></Loading>
		<Index v-if='show' :obserable='obserable'></Index>
		<Choose v-if='show  ' :obserable='obserable'></Choose>
		<Share v-if='show ' :obserable='obserable'></Share>
		</div>`,
	methods: {	

		loading: function(arr, fn, fnEnd) {
			var len = arr.length;
			var count = 0;
			var i = 0;
			arr.loaded = false;

			function loadimg() {
				if (i === len) {
					return;
				}
				var img = new Image();
				img.onload = img.onerror = function() {
					count++;
					if (i < len - 1) {
						i++;
						loadimg();
						fn && fn(i / (len - 1), img.src);
					} else {
						if(!arr.loaded){
							arr.loaded = true;
							fnEnd && fnEnd(img.src);
						}
					}
				};
				img.src = arr[i];
			}
			loadimg();
		},
	
		updatePv() {
			
		}
	},
	components: {
		Index,
		Loading,
		Music,
		Share,
		Choose,
	},
	mounted() {

		var s = this;
		var src = (zmitiUtil.getQueryString('src'));
		var num = (zmitiUtil.getQueryString('num'));

		

		this.isShare = src && !isNaN(num);

		this.src = src;

		obserable.on("setUserInfo",(data)=>{

			this.nickname = data.nickname;
			this.headimgurl = data.headimgurl;
		})

		if(this.isShare){
			 
		}

	

		s.loading(arr, (scale) => {
			s.width = scale;

		}, () => {

			 

			obserable.trigger({
				type:'hideloading1'
			});
			
			s.show = true;
			s.loaded = true;

			s.loading(cacheArr);
			
		})
		


		obserable.on('showShare', () => {
			this.showMask = true;
		})

		obserable.on('updatePv', (data) => {
			this.randomPv += data;
			this.pv += data;

		});
		this.updatePv();
		//zmitiUtil.getOauthurl(obserable);
		//zmitiUtil.wxConfig(document.title, window.desc);
		
		return;
		 
	}
}).$mount('#app1')