import {GUID} from './guid';
export const OnRouteUnload=function(pathname,callback){
	let id = GUID();

	let $ = require('jquery');

	var pushState = history.pushState;
	history.pushState = function () {
	    pushState.apply(history, arguments);
	    $(window).trigger('pushstate', arguments);  // Some event-handling function
	};


	$(window).on('popstate.zk-'+id+' pushstate.zk-'+id,function(){
		if(window.location.pathname!==pathname){
			callback();
			$(window).off('popstate.zk-'+id+' pushstate.zk-'+id);
		}
	});
};