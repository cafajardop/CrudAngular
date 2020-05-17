import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-firebase-angular-92c09.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe (heroe: HeroeModel){
    return this.http.post(`${ this.url }/heroes.json`, heroe)
      .pipe(
        map((resp: any)  => {
             console.log(`${resp.name} esta es la respuesta de map crear heroe` )
             console.log(`${resp} esta es la respuesta de map crear heroe` )
             //el resp.name es el id que retorna firebase pero se llama asi resp.name
            heroe.id = resp.name;
            return heroe;
        })
      );
  }

  actualizarHeroe (heroe: HeroeModel){
    const heroeTemp = {
      //spray operator que significa traer todos los campos del usuario
      ...heroe
    }
    // Borro el Id para que no cause conflicto
    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${ heroe.id }.json`, heroeTemp)
  }

  borrarHeroe (id: string){
    return this.http.delete(`${this.url}/heroes/${ id }.json`)
  }

  getHeroe(id: string){
    return this.http.get(`${this.url}/heroes/${ id }.json`);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(1500)
    );
  }

  private crearArreglo(heoresObj:object){
      
    const heroes: HeroeModel[] = [];

    console.log(`${heoresObj} + este es el arreglo` );

    if (heoresObj === null){return[];}

    Object.keys (heoresObj).forEach(key =>{
      console.log(`${key} + este es el key` );
      const heroe: HeroeModel = heoresObj[key];
      heroe.id = key;
      heroes.push(heroe);
    })
    
    return heroes;
  }
}
