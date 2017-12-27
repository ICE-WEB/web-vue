var page = {
	currPage : 1,
	pageSize : 5,
	totalCount : 0,
	totalPage : 0,
}

var temp = {};

Object.defineProperty(page,'totalCount',{
	get:function(){
		return temp.totalCount;
	},
	set:function(val){
		temp.totalCount = val;
		page.totalPage = parseInt(val / page.pageSize) + (val % page.pageSize > 0 ? 1 : 0);
		console.log(page);
	}
});


export default page;