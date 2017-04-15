import {GUID} from './guid';
export const CompleteOnEvent = function(event,target,callback){
	let $ = require('jquery');
	let id = "zk"+GUID();
	setTimeout(function(){
		$(target).on(event+'.'+id,function(){
			callback();
			$(target).off('change.'+id);
		});
	},100);
	
}