<style>
.gmx-item{height: 40px;border-bottom: 1px solid var(--bgColor);}
.gmx-item:hover{background-color: var(--active);color: #FFF;}
.gmx-item input{height: 100%;line-height: 100%;margin-left: 15px;font-size: 1em; border: none; outline: none;width: calc(100% - 80px);background-color: inherit;color: #000;}
</style>

<template>

			<div class="gmx-item">
				<input type="text" v-model="title" readonly ref="input" @keyup.enter="edit()"/>
				<div class="layui-btn-group">
				  <button class="layui-btn layui-btn-xs layui-btn-primary" @click.stop="edit()"><i class="layui-icon" ref="icon">&#xe642;</i></button>
				  <button class="layui-btn layui-btn-xs layui-btn-primary" @click.stop="del()"><i class="layui-icon">&#xe640;</i></button>
				</div>
			</div>

</template>

<script>


export default {
	props:['title','idx'],
	methods:{
		edit:function () {
			var e = this.$refs["input"];
			var isEdit = $(e).attr("readonly");
			if (isEdit == "readonly") {
				$(e).removeAttr("readonly");
				$(e).focus();
				$(e).select();
				$(this.$refs['icon']).html("&#xe605;");
			}else{
				$(e).attr("readonly","readonly");
				$(this.$refs['icon']).html("&#xe642;");
				//编辑
				this.$parent.edit(this.title,this.idx);
			}
		},
		del:function () {
			var vueObj = this;
			layer.confirm("确定删除该 " + this.title + "？", {
				btn: ['确定','取消'] 
			}, function(){
				//确定删除
				vueObj.$parent.del(vueObj.idx);
			});


		}
	},

}


</script>