import {OnRouteLoad} from './on-route-load';
export const CheckAndWatchRoute=function(route, callback){
	if(window.location.pathname===route){
		callback();
	}
	else{
		OnRouteLoad(route,function(){
			callback();
		});
	}
}