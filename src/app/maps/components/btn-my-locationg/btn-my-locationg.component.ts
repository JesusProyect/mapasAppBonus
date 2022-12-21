import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-locationg',
  templateUrl: './btn-my-locationg.component.html',
  styleUrls: ['./btn-my-locationg.component.css']
})
export class BtnMyLocationgComponent  {

  constructor( private mapService: MapService,
              private placesService: PlacesService ) { }

  goToMyLocation(){

    if( !this.placesService.isUserLocationReady ) throw Error ( 'No hay Ubicacion de usuario' );
    if( !this.mapService.isMapReady ) throw Error ( 'No Esta listo el mapa' )

     this.mapService.flyTo( this.placesService.userLocation! )

  }


}
