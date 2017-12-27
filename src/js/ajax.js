
/*
	json中的参数
	url:请求地址, 	不能为空
	data:参数      	可以为空
	success:成功的回调函数 可以为空 
	error: 失败的回调函数 可以为空
	loading: 是否隐藏加载动画 可以为空	默认显示 true/false
	alert: 是否隐藏错误提示 可以为空 默认提示 true/false
	            
	//模板
	ajax({
		url:"",
		data:data,
		success:function(data){

		}
	});

*/




// var loading = require('./loading.js');

import loading from './loading.js';
export default  function(json){
	if (typeof json.data == "undefined") {json.data = {};}

	if (false != json.loading) {
		loading.show();
	}
	var ajax = $.ajax({    
		url:json.url,
		data:json.data,
		type:'post',
		cache:false,    
		dataType:'json',    
		success:function(data) {
			if (false != json.loading) {
				loading.hide();
			}

			if (data.errCode == 0) {
				if (typeof json.success == "function"){
					json.success(data);
				}
			}else{
				if (false != json.alert && typeof data.errMsg != "undefined") {
					layer.alert(data.errMsg, {title :'警告',icon: 2,scrollbar: false});
				}

				if (typeof json.error == "function") {
					json.error(data);
				}
			}
		},    
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			if (XMLHttpRequest.status == 200) {
				setTimeout(function(){
					window.location.href = "web_user_page_login.do";
				},500)
			}else{

				if (false != json.loading) {
					loading.hide();
				}
				if (errorThrown != "abort" ) {
					if (false != json.alert) {
						layer.alert('系统错误（链接中断）！', {title :'警告',icon: 2,scrollbar: false});
					}
					if (typeof json.error == "function") {
						json.error();
					}
				}
			}
		},
		complete:function(XHR,TS){
			if (typeof json.complete == "function"){
				json.complete(TS);
			}
		}
	});

    return ajax;
}