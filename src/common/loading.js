function Loading(){}
Loading.prototype.show = function(){
	$("#loading").show();
}

Loading.prototype.hide = function(){
	$("#loading").hide();
}
var loading = new Loading;
export default loading;