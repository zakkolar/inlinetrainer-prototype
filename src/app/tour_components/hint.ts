export const HINT = function(selector){

	function guid() {
	  function s4() {
	    return Math.floor((1 + Math.random()) * 0x10000)
	      .toString(16)
	      .substring(1);
	  }
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	    s4() + '-' + s4() + s4() + s4();
	}

	var removeHint=function(el){

		var overlay = $('.'+overlayClass);
		var wrapperClass = $('.'+wrapperClass);
		var wrapper = $()
		overlay.fadeOut(animationSpeed, function(){
			overlay.remove();
			el.css('margin', wrapper.css('margin'));
			el.unwrap();
			el.removeAttr('data-hinted');
			$(document).off('keyup.zk-hint');
			el.off('click.zk-hint');
		});
		
	}

	var removeAll=function(){
		$("*[data-hinted='true']").each(function(){
			removeHint($(this));
		});
	}

	var $ = require('jquery');
	var el =$(selector);
	var animationSpeed=500;

	var overlayClass="block_inlinetrainer_overlay";
	var wrapperClass="block_inlinetrainer_hint";

	if(el.attr('data-hinted')==='true'){
		return false;
	}

	var hintID = guid();

	removeAll();

	var overlay = $("<div class='"+overlayClass+"'></div>").hide();
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



	var removeHint=function(el){

		var overlay = $('.'+overlayClass);
		overlay.fadeOut(animationSpeed, function(){
			overlay.remove();
			el.css('margin',wrapper.css('margin'));
			el.unwrap();
			el.removeAttr('data-hinted');
			$(document).off('keyup.zk-hint-'+hintID);
			el.off('click.zk-hint-'+hintID);
		});
		
	}

	overlay.on('click.zk-hint-'+hintID,function(){
		removeHint(el);
	});

	el.on('click.zk-hint-'+hintID,function(){
		removeHint(el);
	})

	$(document).on('keyup.zk-hint'+hintID,function(e) {
     if (e.keyCode == 27) {
     	removeHint(el);
    	}
	});

}
