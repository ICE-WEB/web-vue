<style>
.edit-tabbar{height: 50px;padding: 5px;}
</style>

<template>
	<!-- 工具条 -->
	<div class="edit-tabbar">
		<button class="layui-btn layui-bg-blue" @click="addCode()"><i class="layui-icon">&#xe64e;</i></button>
		<button class="layui-btn layui-bg-blue" @click="addImg()"><i class="layui-icon">&#xe60d;</i></button>
		<button class="layui-btn layui-bg-blue" @click="addLine()"><i class="layui-icon">----</i></button>
		<button class="layui-btn layui-bg-blue" @click="cache()"><i class="layui-icon">&#x1002;</i></button>

		<button class="layui-btn layui-bg-blue" style="float: right" @click="fullScreen()"><i class="layui-icon" >{{screen}}</i></button>

	</div>
</template>

<script>
	define(function(){


		//注册组件
		Vue.component("gmx-article-tabbar",{
			template:template,
			data:function(){
				return {
					screen:"全屏",
				}
			},
			methods:{
				addTextToParent:function(text){
					this.$parent.addText(text);
				},
				//工具条
				fullScreen:function(){//全屏
					if (this.screen == '全屏') {
						$(".page-edit").append($("#screen_space"));
						$(".page-edit").toggle();
						this.screen = "小屏";
					}else{
						
						$(".page-edit").toggle();
						$(".aritcle").append($("#screen_space"));
						this.screen = "全屏";
					}
					
				},
				cache:function(){//缓存
					this.$parent.cache();
				},
				addCode:function(){
					this.addTextToParent("\n```\n```\n");
				},
				addImg:function(){

				},
				addLine:function(){
					this.addTextToParent("\n-----\n");
				},
				
			}
		});
	});

</script>