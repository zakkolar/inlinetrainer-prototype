import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }  from './app.component';
import { ActionComponent } from './action.component';
import { InlineTrainerComponent } from './inline-trainer.component';

import {SyllabusComponent, CourseComponent} from './page.component';

import { FormsModule }    from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {KeyValueFilterPipe} from './key-value-filter.pipe';
import {ActionCategoryPipe} from './action-category.pipe';
import {ActionSearchPipe} from './action-search.pipe';
import {TopLevelCategoryPipe} from './top-level-category.pipe';
import {ChildCategoryPipe} from './child-category.pipe';
import {FavoriteActionsPipe} from './favorite-actions.pipe';

const appRoutes: Routes = [
  { path: 'syllabus', component: SyllabusComponent },
  { path: 'course', component: CourseComponent, },
  { path: '',   redirectTo: '/course', pathMatch: 'full' },
];







@NgModule({
  imports:      [ BrowserModule, NgbModule.forRoot(), FormsModule, RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, ActionComponent, InlineTrainerComponent, SyllabusComponent, CourseComponent, KeyValueFilterPipe, ActionCategoryPipe, ActionSearchPipe, TopLevelCategoryPipe, ChildCategoryPipe, FavoriteActionsPipe ],
  bootstrap:    [ AppComponent ]
})


export class AppModule{

	
}