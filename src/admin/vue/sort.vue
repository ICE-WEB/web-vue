<style>
.add-sort{border-bottom: 1px solid var(--bgColor);}
.add-sort .add-btn{margin: 15px;}
.add-sort .img-circle{width: 40px;height: 40px;border: 1px solid var(--bgColor);margin: 15px ;}

.sort-list {height: calc(100% - 140px);overflow: hidden;}

.sort-list .item{height: 40px;border-bottom: 1px solid var(--bgColor);}
.sort-list .item:hover{background-color: var(--bgColor);}
.sort-list .item input{height: 100%;line-height: 100%;margin-left: 15px;font-size: 1em; border: none; outline: none;width: calc(100% - 80px);background-color: inherit;}
.sort-list .active{background-color: #FF6600;}
</style>

<template>
	
	<div style="height:100%">
		<div class="add-sort">
			<!-- <img src="assets/imgs/a.jpg"  class="img-circle"> <b>GMX</b><br> -->
			<button class="layui-btn add-btn layui-bg-blue" @click="add()"><i class="layui-icon">&#xe608;</i>新建分类</button>
		</div>
		
		<div class="sort-list">
			<div v-for="(s,i) in list" @click="select(i)" :class="{'active':i==idx?true:false}" :key="i" >
				<gmx-item :title="s.name" :idx="i"> </gmx-item>
			</div>
			
		</div>

	</div>

</template>

<script>

import item from './item.vue'
import ajax from '../../common/ajax.js'

export default {
	data:function(){
		return {
			list:[],
			idx:0,
		}
	},
	components:{'gmx-item':item},
	mounted:function(){
		$(".sort-list").niceScroll();
		this.reload(true);
	},
	methods:{
		reload:function(first){
			var vueObj = this;
			ajax({
				url:"admin/sort/query.api",
				success:function(data){
					vueObj.list = data.vals;
					if (first) {
						vueObj.select(0);
					}
				}
			})
		},
		select:function (idx) {
			this.idx = idx;	
			this.$parent.$refs.title.reload(this.list[idx]);
		},
		add:function(){
			var vueObj = this;
			ajax({
				url:"admin/sort/update.api",
				data:{type:'add',name:'新建分类'},
				success:function(data){
					vueObj.reload();
				}
			})

		},
		edit:function (title,idx) {

			var vueObj = this;
			var sort = this.list[idx];
			ajax({
				url:"admin/sort/update.api",
				data:{type:'update',id:sort.id,name:title},
				success:function(data){
					vueObj.reload();
				}
			})



		},
		del:function (idx) {
			var vueObj = this;
			var sort = this.list[idx];
			ajax({
				url:"admin/sort/update.api",
				data:{type:'del',id:sort.id},
				success:function(data){
					vueObj.reload();
				}
			})
		},

	},
}


</script>