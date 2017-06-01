import { Path } from './path';
import { Destination } from './destination';
import { Injectable } from '@angular/core';
import * as _ from 'underscore';

@Injectable()
export class SettingsService {

  constructor() { }

  public TotalPopulation: number = 100;
  public NoOfGenerations: number = 10000;
  public AllDestinations: Destination[];

  public tournamentSize: number = 5;

  public IsElitist: Boolean = true;

  public MutationRate: number = 0.1;

  public RouteLength: number = 20;

  public HalfRouteLength(): number {
    return Math.floor(this.RouteLength / 2);
  }

  public RunCrossOver(parent1: Path, parent2: Path): Path {

    let parent1Section = Math.floor(Math.random() * (this.HalfRouteLength() - 1));

    let subSetOfParent1 = <Destination[]>[];

    for (let i = parent1Section; i < parent1Section + this.HalfRouteLength(); i++) {
      subSetOfParent1.push(parent1.path[i]);

    }



    let parent2NonParent1Dest = <Destination[]>[];
    parent2NonParent1Dest = _.filter(parent2.path, (p2) => _.every(subSetOfParent1,
      (p1) => {
        return p1.Id != p2.Id;

      }));

    let newRoute = new Path(this, false);
    for (let i = 0; i < this.RouteLength; i++) {
      // if current i is in the starting section of parent 1, use parent 1
      if (i >= parent1Section && i < parent1Section + this.HalfRouteLength()) {
        newRoute.path.push(parent1.path[i]);
      }
      else {

        // if not, check if parent2's destination at i is a destination in parent1's startingsection, 
        let p = parent2NonParent1Dest.shift();
        newRoute.path.push(p);
      }

    }

    if (Math.random() < this.MutationRate) {

      // let noOfPathMutated = Math.floor(Math.random() * this.HalfRouteLength());
      for (let i = 0; i < 1; i++) {
        let random1 = Math.floor(Math.random() * this.RouteLength);
        let random2 = Math.floor(Math.random() * this.RouteLength);

        let middleRoute = newRoute.path[random1];
        newRoute.path[random1] = newRoute.path[random2];
        newRoute.path[random2] = middleRoute;
      }

    }

    return newRoute;

  }

}
