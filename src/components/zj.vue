<template>
	<div>
		<!--<h3>我是子组件</h3>-->
		<!--<h2>{{message}}</h2>-->
		<!--<h2>world</h2>-->
		<button @click='nums'>{{counter}}</button>
	</div>
</template>

<script>
	export default {
//		props:['message'],    //通过prop
		data () {
			return {
				message: "",
				counter: 0
			}
		},
		mounted () {  //通过$emit
			this.$emit("getmes","hello");
			
		},
		methods: {    //通过$ref
			getmessage (v) {
				this.message = v;
			},
			nums () {
				this.counter +=1;
				this.$emit('num');
			}
		}
	}
</script>

<style>
</style>