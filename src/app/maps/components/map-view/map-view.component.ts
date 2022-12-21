import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, Marker, Popup } from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor( private placeService: PlacesService,
               private mapService: MapService  ) { }

  ngAfterViewInit(): void {

    if( !this.placeService.userLocation ) throw Error( 'No hay places userLocation' );

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placeService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });

    const popup = new Popup()
      .setHTML(`
        <h6> Aqui estoy</h6>
        <span> Estoy en este lugar del mundo </span>
      `);

      new Marker({color: 'red'})
        .setLngLat( this.placeService.userLocation )
        .setPopup( popup )
        .addTo( map );

        this.mapService.setMap( map );

  }

}
