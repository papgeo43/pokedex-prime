import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CarouselModule } from 'primeng/carousel';
import {DialogModule} from 'primeng/dialog';
import { PokemonDetailsComponent } from './pokemon-list/pokemon-details/pokemon-details.component';
@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule,
    DialogModule
  ],
  providers: [ConfirmationService,
    { provide: 'pokemonListApi', useValue: 'https://pokeapi.co/api/v2/pokemon' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
