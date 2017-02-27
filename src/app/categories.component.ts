import { Component, OnInit } from '@angular/core';
import { Category } from './category';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: './heroes.component.html'
})
export class CategoriesComponent implements OnInit {
  categories: Category[];
  
  getCategories(): void {
    this.heroService.getHeroes().then(heroes=>this.heroes=heroes);
  }
  
  
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  ngOnInit():void{
    this.getHeroes();
  }


}