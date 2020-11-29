import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class GetPokemonsService implements OnInit {
 display = new BehaviorSubject<boolean>(false)
  constructor(
    private http: HttpClient,
    @Inject('pokemonListApi') private pokemonListApi: string,
  ) {}

  ngOnInit() {}

  getPokemons() {
   return this.http.get<Pokemon>(this.pokemonListApi)
      .pipe(
        map((x) => x.results),
        switchMap(x => forkJoin(this.generateUrls(x))),
        map(x => x.map(x => {
         return {name:x.name, sprites:x.sprites}
       })),
        tap(x=> console.log(x))
      )
  }

  generateUrls(arr: Pokemon[]): Observable<Pokemon>[] {
    const res$ = [];
    arr.forEach((x: Pokemon) => {
      res$.push(this.http.get(`${this.pokemonListApi}/${x.name}`));
    });

    return res$;
  }
}
