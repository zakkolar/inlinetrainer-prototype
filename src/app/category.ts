export class Category{
	name: string;
	parent: Category;
	constructor(name:string, parent?: Category){
		this.name=name;
		this.parent=parent || null;
	}

}