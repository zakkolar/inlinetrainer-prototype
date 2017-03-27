import {Prerequisite} from './prerequisite';
import {Category} from './category';
import {Step} from './step';
export class Action{
	name: string;
	categories: Category[];
	favorite: boolean;
	steps: Step[];
	shown: boolean;
	help;

}