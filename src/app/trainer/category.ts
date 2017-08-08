export class Category{
	name: string;
	parent: Category;
	description: string;
	open: boolean;
	constructor(name:string, parent?: Category, description?: string){
		this.name=name;
		this.parent=parent || null;
		this.description=description || null;
		this.open=false;
	}

}