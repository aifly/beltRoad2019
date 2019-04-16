<template>
    <div>
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
        <div class="zmiti-go" v-press v-tap='[goCountry]'>
            <img :src="imgs.go" alt="">
        </div>
    </div>
</template>
<script>

    export default {
        data(){
            return {
                countrys1:window.config.countryList.slice(0,len/2),
				countrys2:window.config.countryList.slice(len/2),
            };
        },
        methods: {
            
        },
    }
</script>
