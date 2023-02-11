Vue.component('mftree', {
    template:
		`<div v-if="list && list.length">
			<div v-for="(node,index) in list">
			 	<div :id="'regions_'+node.id" :title="node.fieldname" v-html="node.fieldno"
					class="regions-item" :style="'width:'+node.width+'px;height:' + height + 'px;line-height:' + height + 'px;left:'+node.left+'px;background-color:'+node.bgcolor+';top: '+ level * height +'px;'">
			    </div>
			    <mftree v-if="node.children" :list="node.children" :level="level+1" :height="height" ></mftree>
		    </div>
	    </div>`,
    props:{
    	list: Array,
    	level: {
    		type: Number,
    		default: 0
    	},
    	height: {
    		type: Number,
    		default: 30
    	}
    }
})
