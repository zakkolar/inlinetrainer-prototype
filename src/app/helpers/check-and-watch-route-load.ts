import {OnRouteLoad, OffRouteLoad} from './on-route-load';
export const CheckAndWatchRouteLoad=function(route:string,id:string, callback:Function){
	if(window.location.pathname===route){
		callback();
	}
	else{
		OnRouteLoad(route,id,function(){
			callback();
		});
	}
}

export const UnwatchRouteLoad=function(id:string){
	OffRouteLoad(id);
}