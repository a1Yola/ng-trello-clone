import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from '../styles/material/material.module';

import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from 'src/app/core/views/home/home.page';
import { ListComponent } from '../core/components/list/list.component';
import { CardComponent } from './../core/components/card/card.component';
import { CardFormComponent } from './components/card-form/card-form.component';
import { ColumnFormComponent } from './components/column-form/column-form.component';

import { CardEffects } from './../core/store/effects/card.effects';
import { cardReducer } from './../core/store/reducers/card.reducer';
import { ListEffects } from '../core/store/effects/list.effects';
import { listReducer } from 'src/app/core/store/reducers/list.reducer';

@NgModule({
  declarations: [
    HeaderComponent,
    HomePageComponent,
    ListComponent,
    CardComponent,
    CardFormComponent,
    ColumnFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    StoreModule.forRoot({
      lists: listReducer,
      cards: cardReducer,
    }),
    EffectsModule.forRoot([ListEffects, CardEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
  exports: [
    CardComponent,
    ListComponent,
    CardFormComponent,
    HeaderComponent,
    ColumnFormComponent,
  ],
})
export class SharedModule {}
