import ajax from './ajax.js';


function Data(){
	this.baseURL = "http://gumx.top:90/admin/";
	this.api = {
		sort:this.baseURL + "sort/query.api",
		text:this.baseURL + "text/query.api",
		read:this.baseURL + "text/read.api",
	};

	Data.prototype.getSort = function(vals){
		ajax({
			url:this.api.sort,
			success:function(data){
				vals.splice(0,vals.length);
				data.vals.forEach(function(e){vals.push(e)});
			}
		})
	}

	Data.prototype.getText = function(vals,page,option){
		if (option.sort_id==-1) {option.sort_id='';}
		option.page = page.currPage;
		option.pageSize = page.pageSize;
		ajax({
			url:this.api.text,
			data:option,
			success:function(data){
				vals.splice(0,vals.length);
				data.vals.forEach(function(e){vals.push(e)});
				page.totalCount = data.count;				
			}
		})
	}

	Data.prototype.readText = function(textId){
		ajax({
			url:this.api.read,
			data:{id:textId},
			success:function(data){
				var content = data.val;
				content = content.replace("---summary---","> ").replace("---summary---","\n").replace(/&gt;/g,"> ");
				marked.setOptions({
					highlight: function (code) {
						return hljs.highlightAuto(code).value;
					}
				});

				var html = marked(content);
				html = html.replace(/&amp;lt;/g,"&lt;").replace(/&amp;gt;/g,"&gt;")
				$("#textContent").html(html);
			}
		})
	}
}


export default new Data();