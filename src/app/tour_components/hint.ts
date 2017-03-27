export const HINT = function(selector){
	var $ = require('jquery');
	var el =$(selector);
	var animationSpeed=500;

	if(el.attr('data-hinted')==='true'){
		return false;
	}
	var overlay = $("<div class='block_inlinetrainer_overlay'></div>").hide();
	$('body').append(overlay);
	overlay.fadeIn(animationSpeed);
	
	el.attr('data-hinted','true');
	var wrapper = $('<div class="block_inlinetrainer_hint"></div>').css({
		'z-index': overlay.css('z-index')+1,
		'margin':el.css('margin'),
		'background-color':$('body').css('background-color')
	});
	var directions = ['left','right','top','bottom'];
	for(var i=0; i<directions.length; i++){
		var direction = directions[i];
		wrapper.css('margin-'+direction,function(){
			var currentMargin = parseInt($(this).css('margin-'+direction));
			var currentPadding = $(this).css('padding');
			
			return 0;
		});
	}
	
	el.wrap(wrapper).css('margin','0');



	var removeHint=function(){
		overlay.fadeOut(animationSpeed, function(){
			overlay.remove();
			el.css('margin',wrapper.css('margin'));
			el.unwrap();
			el.removeAttr('data-hinted');
			$(document).unbind('keyup');
		});
		
	}

	overlay.click(function(){
		removeHint();
	});

	wrapper.click(function(){
		removeHint();
	})

	$(document).keyup(function(e) {
     if (e.keyCode == 27) {
     	removeHint();
    	}
	});

}
