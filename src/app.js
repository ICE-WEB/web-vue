import theme from './js/color-themes.js';
import data from './js/data.js';
import page from './js/page.js'


var app = new Vue({
	el:".l-main-container",
	data:{
		sort:[],
		text:[],
		contentView:"list", //text/list
		searchTitle:"",
		selectedSortId:-1,
		selectedText:null,
		page:page,
	},
	mounted:function(){
		theme.init();
	},
	created:function(){
		data.getSort(this.sort);
		data.getText(this.text,page,{});
	},
	computed:{
		selectedSort:function(){
			var s = {id:-1,name:"全部"};
			var that = this;
			this.sort.forEach(function(e){
				if (that.selectedSortId == e.id) {
					s = e;
					return;
				}
			});
			return s;
		},
	},
	watch:{
		selectedSortId:function (nv) {
			this.searchText();
		}
	},
	methods:{
		sortName:function(sort_id){
			var s = "";
			this.sort.forEach(function(e){
				if (sort_id == e.id) {
					s = e.name;
					return;
				}
			});
			return s;
		},
		searchText:function(){
			this.selectedText = null;
			this.contentView = "list";
			data.getText(this.text,page,{sort_id:this.selectedSortId,title:this.searchTitle});
			console.log();
			if (jQuery(".page").scrollTop() > 250) {$(".page").scrollTop(250);}
			
		},
		readText:function(text){
			this.contentView = "text";
			this.selectedText = text;
			data.readText(text.id);
		},
	},
})


