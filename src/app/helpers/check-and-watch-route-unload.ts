import {OnRouteUnload,OffRouteUnload} from './on-route-unload';
export const CheckAndWatchRouteUnload=function(route:string, id:string, callback:Function){
	if(window.location.pathname!==route){
		callback();
	}
	else{
		OnRouteUnload(route,id,function(){
			callback();
		});
	}
}

export const UnwatchRouteUnload=function(id:string){
	OffRouteUnload(id);
}