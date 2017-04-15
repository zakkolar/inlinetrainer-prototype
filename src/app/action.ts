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
	complete: boolean;
	currentStepSubscription:string;

	constructor(args){
		this.name=args.name;
		this.categories = args.categories;
		this.favorite=false;
		this.shown=false;
		this.steps=args.steps || [];
		this.help = args.help;
		this.currentStep=null;
		this.currentStepSubscription=null;
		this.complete=false;

	}

	initWatchSteps(){
		let reversedSteps=this.steps.slice().reverse();
		for(let step of reversedSteps){
			step.watchComplete();
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
				else{
					this.markComplete();
				}
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
		if(index>=0){
			let action = this;
			this.currentStep=this.steps[index];
			this.currentStepSubscription=this.currentStep.subscribe(function(){
				if(action.currentStep.complete){
					action.nextStep();
				}
			});
		}
	}

	markComplete(){
		this.complete = true;
		this.currentStep = null;
		if(this.currentStepSubscription!=null){
			this.currentStep.unsubscribe(this.currentStepSubscription);
		}
	}

	nextStep(){
		let nextStepIndex=this.currentStepIndex()+1;
		if(nextStepIndex>this.steps.length){
			this.markComplete();
		}
		else{
			this.setCurrentStep(this.steps[nextStepIndex]);
		}
	}

	previousStep(){
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