import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @ViewChild( IonList, {static:true} ) lista: IonList;
  @Input() terminada = true;
  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController ) { }

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

  async editarLista(deseo: Lista) {
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: deseo.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            console.log(data);
            if ( data.titulo.length === 0 ) {
              return;
            }

            deseo.titulo = data.titulo;
            this.deseosService.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();

  }
}
