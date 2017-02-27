import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { FormsModule }    from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {KeyValueFilterPipe} from './key-value-filter.pipe';
import {ActionCategoryPipe} from './action-category.pipe';
import {ActionSearchPipe} from './action-search.pipe';
import {TopLevelCategoryPipe} from './top-level-category.pipe';
import {ChildCategoryPipe} from './child-category.pipe';





@NgModule({
  imports:      [ BrowserModule, NgbModule.forRoot(), FormsModule ],
  declarations: [ AppComponent, KeyValueFilterPipe, ActionCategoryPipe, ActionSearchPipe, TopLevelCategoryPipe, ChildCategoryPipe ],
  bootstrap:    [ AppComponent ]
})


export class AppModule{

	
}