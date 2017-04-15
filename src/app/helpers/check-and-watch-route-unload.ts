import {OnRouteUnload} from './on-route-unload';
export const CheckAndWatchRouteUnload=function(route, callback){
	if(window.location.pathname!==route){
		callback();
	}
	else{
		OnRouteUnload(route,function(){
			callback();
		});
	}
}