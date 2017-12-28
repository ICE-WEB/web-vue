<style>
.edit-title{height: 60px;padding: 5px;padding-left: 20px;border-bottom: 1px solid var(--bgColor);    line-height: 60px;font-size: 1.3em;    color: #000;}
.edit-title input{height: 50px;line-height: 50px;font-size: 1.5em; border: none; outline: none;width: 100%;}
.edit-content{height: calc(100% - 60px);}
.edit-content{background-color:var(--bgColor);font-size: 1.5em;color: #000;}
.markdown-body{min-height: auto;height: 100%;}
</style>

<template>
	<span id="articleSpace">	
		<!-- 标题 -->
		<div class="edit-title">
			{{title}}
		</div>
		<div class="edit-content"><mavon-editor ref="editor" v-model="content" @save="cache()"></mavon-editor></div>
	</span>

</template>

<script>
import ajax from '../../common/ajax.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import base64 from '../../common/jquery.base64.js'

Vue.use(mavonEditor)

export default {
	data:function(){
		return {
			title:"标题",
			content:"GMX",
			textId:-1,
		}
	},
	mounted:function(){
		// scroll(".edit-content");
		// var vueObj = this;
		// $(".edit-content").dropImg(function(result,fileName){
		// 	ajax({
		// 		url:"img/save.api",
		// 		data:{img:result,textId:vueObj.textId},
		// 		success:function(data){
		// 			layer.msg(data.errMsg);
		// 			if (data.errCode == 0) {
		// 				var img = "\n![" + fileName +"](" + data.img + ")\n";
		// 				vueObj.insertStr(img) ;
		// 			}
		// 		}
		// 	})
		// });
	},
	methods:{
		reload:function(text){
			this.textId = text.id;
			this.title = text.title;
			this.qurey();
		},
		qurey:function(){
			var vueObj = this;
			ajax({
				url:"admin/text/read.api",
				data:{id:this.textId},
				success:function(data){
					layer.msg(data.errMsg);
					if (data.errCode == 0) {
						vueObj.content = data.val;
					}
				}
			})
		},
		cache:function(){//缓存
			$.base64.utf8encode=true;
			var val=$.base64.btoa(this.content)
			var html = $.base64.btoa($(".v-show-content").html());
			ajax({
				url:"admin/text/edit.api",
				data:{id:this.textId,content:val,"html":html},
				success:function(data){
					layer.msg(data.errMsg);
				}
			})
		},
		// //工具条
		// addText:function(text){
		// 	this.insertStr(text);
		// },
		// tab:function(){
		// 	this.insertStr("    ");
		// },
		//在光标处插入文本
		// insertStr:function(str){
		// 	var selection= window.getSelection ? window.getSelection() : document.selection;
		// 	var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
		// 	if (!window.getSelection){
		// 		document.getElementById('editContent').focus();
		// 		var selection= window.getSelection ? window.getSelection() : document.selection;
		// 		var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
		// 		range.pasteHTML(str);
		// 		range.collapse(false);
		// 		range.select();
		// 	}
		// 	else{
		// 		document.getElementById('editContent').focus();
		// 		range.collapse(false);
		// 		var hasR = range.createContextualFragment(str);
		// 		var hasR_lastChild = hasR.lastChild;
		// 		while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
		// 			var e = hasR_lastChild;
		// 			hasR_lastChild = hasR_lastChild.previousSibling;
		// 			hasR.removeChild(e)
		// 		}
		// 		range.insertNode(hasR);
		// 		if (hasR_lastChild) {
		// 			range.setEndAfter(hasR_lastChild);
		// 			range.setStartAfter(hasR_lastChild)
		// 		}
		// 		selection.removeAllRanges();
		// 		selection.addRange(range)
		// 	}
		// },

	}
}


</script>