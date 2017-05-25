import { SettingsService } from './settings.service';
import { Destination } from 'app/destination';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Path } from "app/path";
import { Generation } from "app/generation";


@Injectable()
export class CalculateService {

  constructor(private settingsService: SettingsService) { }


  public CalculateBestRoute(destinations: Destination[]): Observable<Destination[]> {

    this.settingsService.AllDestinations = destinations;
    let paths: Path[] = <Path[]>[];

    // generate routes
    for (let i = 0; i < this.settingsService.TotalPopulation; i++) {
      paths.push(new Path(this.settingsService, true));
    }

    let currG = new Generation(this.settingsService);
    currG.paths = paths;

    // start to evolve

    for (let i = 0; i < this.settingsService.NoOfGenerations; i++) {


      let newG = new Generation(this.settingsService);

      newG.paths.push(currG.FittestPath());

      // get new generation of routes
      for (let j = 1; j < this.settingsService.TotalPopulation; j++) {

        // select two routes via tournament selection
        var parent1 = currG.RunTournament();
        var parent2 = currG.RunTournament();

        // run crossover
        newG.paths.push(this.settingsService.RunCrossOver(parent1, parent2));

      }

      // console.log("Fittest Route after generation {0}: fitness {1}", i, newG.FittestRoute.Fitness));
      //Console.WriteLine(String.Format("Fittest Route after generation {0}: least fitness {1}", i, newG.UnFittestRoute.Fitness));
      currG = newG;

    }

    return Observable.of(currG.FittestPath().path);

    // Console.WriteLine("route: " + currG.FittestRoute.ToString());

  }


}
