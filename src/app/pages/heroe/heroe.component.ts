import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model'; 
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
})
export class HeroeComponent implements OnInit {
  heroe = new HeroeModel();

  constructor(
    private heoresService: HeroesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Sirve para navegar a traves del routerlink y debemos en el constructor inyectar private route: ActivatedRoute
    const id = this.route.snapshot.paramMap.get('id');

    console.log(`${id} este es el id capturado` );
    

    if (id !== 'nuevo') {
      this.heoresService.getHeroe(id).subscribe((resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  // Guarda la informacion del heroe
  guardar(form: NgForm) {
    // Debemos confirmar que el formulario sea valido
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }
    // console.log(form);
    // console.log(this.heroe);

    //Importamos la libreria de swal
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    // Declaramos esta variable de tipo let observable para ya sea recibir la informacion de actualizar heroe o crear heroe
    let peticion: Observable<any>;
    let mensaje: boolean;

    if (this.heroe.id) {
      peticion = this.heoresService.actualizarHeroe(this.heroe);
      mensaje = true;
    } else {
      peticion = this.heoresService.crearHeroe(this.heroe);
      mensaje = false;
    }

    // En este punto la peticion nos retorna algo ya sea si actualizo o creo el heroe
    peticion.subscribe((resp) => {
      if (mensaje) {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizó correctamente',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se creo correctamente',
          icon: 'success',
        });
      }
    });
  }
}
