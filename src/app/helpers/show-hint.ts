import {SLIDE} from '../tour_components/slide';
import {UNBLOCK_ELEMENT} from '../tour_components/unblock_element';
import {HINT} from '../tour_components/hint';
export const ShowHint= function (target, trainer?){
	if(!trainer){
		trainer='#trainer';
	}
	SLIDE(target, function(){
		UNBLOCK_ELEMENT(trainer, target,function(){
			HINT(target);
		});
	});
	
	
};