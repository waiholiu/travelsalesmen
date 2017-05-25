import { Path } from './path';
import { Destination } from './destination';
import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable()
export class SettingsService {

  constructor() { }

  public TotalPopulation: number = 20;
  public NoOfGenerations: number = 30000;
  public AllDestinations: Destination[];

  public tournamentSize: number = 3;

  public IsElitist: Boolean = true;

  public MutationRate: number = 0.99;

  public RouteLength: number = 50;

  public HalfRouteLength() : number
  {
      return Math.floor(this.RouteLength/2);
  }

  public RunCrossOver (parent1 : Path, parent2: Path) : Path
  {

      let parent1Section = Math.round(Math.random() * (this.HalfRouteLength()));
      let subSetOfParent1 = <Destination[]>[];

      for (let i = parent1Section; i < parent1Section + this.HalfRouteLength(); i++) {
          subSetOfParent1.push(parent1.path[i]);

      }

      let  parent2NonParent1Dest = <Destination[]>[];
      parent2NonParent1Dest = _.filter(parent2.path, (p2) => _.every(subSetOfParent1, (p1) => p1.Id != p2.Id ));
      // new Queue<Destination>(parent2.path.Where(p2 => subSetOfParent1.All(p1 => p1.Id != p2.Id)));



      let newRoute = new Path(this, false);
      for (let i = 0; i < this.RouteLength; i++) {
          // if current i is in the starting section of parent 1, use parent 1
          if (i >= parent1Section && i < parent1Section + this.HalfRouteLength()) {
              newRoute.path.push(parent1.path[i]);
          }
          else {
              // if not, check if parent2's destination at i is a destination in parent1's startingsection,    
              newRoute.path.push(parent2NonParent1Dest.shift());
          }

      }

      if (Math.random() < this.MutationRate) {
          let random1 = Math.round(Math.random()* this.RouteLength); 
          let random2 = Math.round(Math.random()* this.RouteLength); 

          let middleRoute = newRoute.path[random1];
          newRoute.path[random1] = newRoute.path[random2];
          newRoute.path[random2] = middleRoute;


      }

      return newRoute;

  }

}
