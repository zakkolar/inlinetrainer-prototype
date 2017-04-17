function makeEventString(event,id){
	return event+'.'+id;
}
export const WatchForEvent = function(event:string,target:string ,id:string,callback:Function){
	let $ = require('jquery');

	setTimeout(function(){
		$(target).on(makeEventString(event,id),function(e){
			callback();
		});
	},100);

}

export const UnwatchForEvent = function(event:string,target:string,id:string){
	let $ = require('jquery');
	$(target).off(makeEventString(event,id));
}
