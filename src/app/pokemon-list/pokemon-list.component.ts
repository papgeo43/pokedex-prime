import { GetPokemonsService } from './../get-pokemons.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {
  pokemonList;
  display: boolean = false;
  constructor(private getPokemonsSvs: GetPokemonsService) {}

  ngOnInit(): void {
    this.getPokemonsSvs.getPokemons().subscribe((x) => (this.pokemonList = x));
  }

  showDialog() {
    this.getPokemonsSvs.display.next(true);
    this.display = true;
  }
}
