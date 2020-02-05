import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() terminada = true;

  constructor( public deseosService: DeseosService,
               private router: Router ) { }

  ngOnInit() {}
  

  listaSeleccionada(deseo:Lista) {
    console.log({ deseo });
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ deseo.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ deseo.id }`);
    }

  }

  borrarLista(deseo: Lista) {
    this.deseosService.borrarLista(deseo).then(() =>{
      this.deseosService.presentToast("Se ha eliminado la lista correctamente");
    });
  }

  
}
