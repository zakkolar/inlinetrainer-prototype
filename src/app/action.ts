import {Prerequisite} from './prerequisite';
import {Category} from './category';
import {Step} from './step';
export class Action{
	name: string;
	categories: Category[];
	favorite: boolean;
	steps: Step[];
	shown: boolean;
	help: string;
	currentStep: Step;
	previousStep:Step;
	complete: boolean;
	currentStepSubscription:string;
	previousStepSubscription:string;

	constructor(args){
		this.name=args.name;
		this.categories = args.categories;
		this.favorite=false;
		this.shown=false;
		this.steps=args.steps || [];
		this.help = args.help;
		this.currentStep=null;
		this.currentStepSubscription=null;
		this.previousStepSubscription=null;
		this.complete=false;

	}

	initWatchSteps(){
		let reversedSteps=this.steps.slice().reverse();
		for(let step of reversedSteps){
      step.initWatch();
		}
	}

	initCurrentStep(){
		let reversedSteps=this.steps.slice().reverse();
		for(let index in reversedSteps){
			if(reversedSteps[index].complete){
					if(parseInt(index)>0){
					this.setCurrentStep(reversedSteps[parseInt(index) - 1]);
					break;
				}
			}
		}
    if(this.currentStep==null){
      if(this.steps.length>0){
        this.setCurrentStep(this.steps[0]);
      }
    }
	}

	currentStepIndex(){
		return this.steps.indexOf(this.currentStep);
	}

	setCurrentStep(step:Step){
		let index = this.steps.indexOf(step);
		if(this.currentStepSubscription!=null){
			this.currentStep.unsubscribe(this.currentStepSubscription);
		}
		if(this.previousStepSubscription!=null){
			this.previousStep.unsubscribe(this.previousStepSubscription);
		}
		if(index>=0){
			let action = this;
			this.currentStep=this.steps[index];
			this.currentStepSubscription=this.currentStep.subscribe(function(){
				if(action.currentStep.complete){
					action.incrementStep();
				}
			});
      this.currentStep.watchComplete();
		}
		if(index>0){
			let action = this;
			this.previousStep=this.steps[index-1];
			this.previousStepSubscription=this.previousStep.subscribe(function(){
				if(!action.previousStep.complete){
					action.decrementStep();
				}
			});
		}
		else{
			this.previousStep=null;
			this.previousStepSubscription=null;
		}

	}

	markComplete(){
		this.complete = true;
		this.currentStep = null;
		if(this.currentStepSubscription!=null){
			this.currentStep.unsubscribe(this.currentStepSubscription);
		}
	}

	incrementStep(){
		let nextStepIndex=this.currentStepIndex()+1;
		if(nextStepIndex>this.steps.length){
			this.markComplete();
		}
		else{
			this.setCurrentStep(this.steps[nextStepIndex]);
		}
	}

	decrementStep(){
		let previousStepIndex=this.currentStepIndex()-1;
		if(previousStepIndex>=0){
			this.setCurrentStep(this.steps[previousStepIndex]);
		}

	}

	initSteps(){
		this.initWatchSteps();
		this.initCurrentStep();
	}

}
