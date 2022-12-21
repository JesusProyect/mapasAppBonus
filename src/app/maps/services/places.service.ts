import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [ number, number ];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];
  
  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor( private placesApi: PlacesApiClient,
               private mapService: MapService ) { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[ number, number ]>{  
    return new Promise ( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition( 
        ( {coords} ) => {
          this.userLocation = [ coords.longitude, coords.latitude ];
            resolve( this.userLocation );
          },
        ( err ) => {
          console.log( err );
          alert( 'No se pudo obtener la geolocalizacion' );
          reject();
        }
       );
    })
  }

  getPalcesByQuery( query: string = '' ){

    if( query.length === 0 ) {
      this.places = [];
      this.isLoadingPlaces = false
      return;
    }
    
    if( !this.userLocation ) throw Error( 'no hay userLocation' )
    
    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>( `/${ query }.json` , {
      params: {
        proximity: this.userLocation!.join(',')
      }
    })
      .subscribe( ({ features }) => {
         this.isLoadingPlaces = false;
         this.places = features;
         this.mapService.createMarkersFromPlaces( features, this.userLocation! );
         //cada vez que haga una query se borre la polilye de existir
         this.mapService.borrarPoliline();
       });
  }

  deletePlaces(){
    this.places = [];
  }

}
