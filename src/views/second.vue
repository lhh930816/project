<template>
	<div>
		<!--<first is="show" keep-alive></first>
		<first keep-alive></first>
		<div>
			<ul>
				<li>首页</li>
			</ul>
			<first></first>
		</div>-->
		
		<div>
			<!--<h1>我是父组件</h1>-->
			<!--<child is='show'></child>-->
			<!--<child is='show' message="子组件"></child>-->
			<!--通过props通信--> 
			<!--<input type="text" v-model="mes" />
			<child is='show' v-bind:message='mes'></child>-->
			
			<!--通过ref-->
			<!--<h1>老大</h1>
			<child is='show' ref="one"></child>  -->
			
			<!--通过$emit-->
			<!--<h1>{{title}}</h1>
			<child is="show" @getmes="mess"></child>-->
			<p>{{total}}</p>
			<button-counter is='show' @num='totals'></button-counter>
			<button-counter is='show' @num='totals'></button-counter>
		</div>
	</div>
</template>

<script>
	import first from "@/components/zj.vue"
	export default({
		components:{
			 show: first,
			first
		},
		data () {
			return {
				mes: '今天周五',
				title: '',
				total: 0
			}
		},
//		mounted() { //通过$ref
//			this.$refs.one.getmessage("老二");
//		},
		methods: { //通过$emit
			mess (title) {
				this.title = title;
			},
			totals () {
				this.total +=1;
			}
		}
	})
</script>

<style>
</style>