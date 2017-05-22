import { Destination } from 'app/destination';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";


@Injectable()
export class CalculateService {

  constructor() { }


  public CalculateBestRoute(destinations : Destination[]) : Observable<Destination[]>{


      return Observable.of(destinations);


  }

}
