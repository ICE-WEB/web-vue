<style>
.gmx-title {height: 100%;}
.gmx-title .add-btn{width: calc(100% - 10px);margin: 10px 5px 0;}
.gmx-title .title-list{overflow-y:hidden;height: calc(100% - 70px);}

.title-list .active{background-color: #FF6633;}

</style>

<template>
	
	<div class="gmx-title">

		<button class="layui-btn add-btn layui-bg-blue" @click="add()"><i class="layui-icon">&#xe608;</i>新建文章</button>
		<hr class="layui-bg-red" style="background-color: var(--bgColor)!important;">
		
		<div class="title-list">
			<div v-for="(s,i) in list" @click="select(s,i)" :class="{'active':i==idx?true:false}" :key="i + 'title'" >
				<gmx-item :title="s.title" :idx="i"> </gmx-item>
			</div>
		</div>

	</div>



</template>

<script>
	define(["vue!/web/vue/admin/item"],function(){
		//注册组件
		Vue.component("gmx-title",{
			template:template,
			data:function(){
				return {
					list:[],
					idx:0,
					sortId:-1,	
				}
			},
			mounted:function(){
				scroll(".gmx-title .title-list");
			},
			methods:{
				reload:function(sort){
					this.sortId = sort.id;
					this.query();
				},
				query:function(){
					var vueObj = this;
					ajax({
						url:"admin/text/query.api",
						data:{sort_id:this.sortId},
						success:function(data){
							if(data.errCode == 0){
								vueObj.list = data.vals;
								if(vueObj.list.length > 0){
									vueObj.select(vueObj.list[0],0);
								}
							}else{
								layer.msg(data.errCode);
							}
						}
					})
				},
				select:function (s,idx) {
					this.idx = idx;	
					this.$parent.$refs.article.reload(this.list[idx]);
				},
				add:function(){
					var vueObj = this;
					ajax({
						url:"admin/text/update.api",
						data:{type:'add',sort_id:this.sortId,title:"新建文章"},
						success:function(data){
							vueObj.query();
						}
					})
				},
				edit:function (title,idx) {
					vueObj = this;
					var text = this.list[idx];
					ajax({
						url:"admin/text/update.api",
						data:{type:'update',id:text.id,title:title},
						success:function(data){
							vueObj.query();
						}
					})
				},
				del:function (idx) {
					var vueObj = this;
					var text = this.list[idx];
					ajax({
						url:"admin/text/update.api",
						data:{type:'del',id:text.id},
						success:function(data){
							vueObj.query();
						}
					})
				},
			}


		});
	});

</script>