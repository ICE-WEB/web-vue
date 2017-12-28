import sort from './vue/sort.vue';
import title from './vue/title.vue';
import article from './vue/article.vue';

var app = new Vue({
	el:".page",
	components:{
		"gmx-sort":sort,
		"gmx-title":title,
		"gmx-article":article,
	},
});