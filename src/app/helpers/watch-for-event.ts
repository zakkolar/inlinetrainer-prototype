import {GUID} from './guid';
export const WatchForEvent = function(event:string,target:string,callback:Function){
	let $ = require('jquery');
	let id = "zk"+GUID();
	setTimeout(function(){
		$(target).on(event+'.'+id,function(){
			callback();
			$(target).off(event+'.'+id);
		});
	},100);
	
}