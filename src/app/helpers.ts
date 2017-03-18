let helpers={

stringify:function(input){
		return input.toLowerCase().replace(/ /g,"_");
	}
};

export const HELPERS = helpers;