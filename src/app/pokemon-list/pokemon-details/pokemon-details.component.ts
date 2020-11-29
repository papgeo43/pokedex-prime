import { GetPokemonsService } from './../../get-pokemons.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/app/pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
})
export class PokemonDetailsComponent implements OnInit {
  display: boolean;
  pokemonName: string;
  obs:Observable<unknown>
  constructor(
    private getPokemonsSvs: GetPokemonsService,
    private http: HttpClient,
    @Inject('pokemonListApi') private pokemonListApi: string,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPokemonsSvs.display.subscribe((x) => (this.display = x));
    this.activatedRoute.paramMap.subscribe((params) => {
      this.pokemonName = params.get('name');
    });
    this.pokemonDetails()
  }

  pokemonDetails():Observable<unknown> {
  this.obs =  this.http.get<Pokemon>(`${this.pokemonListApi}/${this.pokemonName}`)
      .pipe(
        map(x => {
          return [{ name: x.name, sprites: x.sprites }]
        }),
        tap(x=> console.log(x))
  )
    return this.obs
  }

  close() {
    this.router.navigateByUrl('/');
  }
}
