import { SettingsService } from './settings.service';
import { Destination } from 'app/destination';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Path } from "app/path";
import { Generation } from "app/generation";
import { Subject } from "rxjs/Subject";


@Injectable()
export class CalculateService {

  constructor(private settingsService: SettingsService) { }

  public broadcast: Subject<number> = new Subject<number>();

  public CalculateBestRoute(destinations: Destination[]){

    // let keepOptimising = true;
    // while(keepOptimising){
    //   keepOptimising = OptimiseRoute();
    // }
  
    // store all destinations 
    this.settingsService.AllDestinations = destinations;
    let paths: Path[] = <Path[]>[];

    // generate a whole lot of generated paths
    for (let i = 0; i < this.settingsService.TotalPopulation; i++) {
      paths.push(new Path(this.settingsService, true));
    }

    // create a new generation for these paths
    let currG = new Generation(this.settingsService);
    currG.paths = paths;

    // start to evolve
    for (let i = 0; i < this.settingsService.NoOfGenerations; i++) {

      // create the next generation
      let newG = new Generation(this.settingsService);

      // if we want to have eliteism.
      //newG.paths.push(currG.FittestPath());

      // get new generation of routes
      for (let j = 0; j < this.settingsService.TotalPopulation; j++) {

        // select two routes via tournament selection
        let parent1 = currG.RunTournament();
        let parent2 = currG.RunTournament();
        if(parent2.path.length > 50)
        {
          console.log('parent2');
          
        }

        // run crossover
        let crossOverPath = this.settingsService.RunCrossOver(parent1, parent2);
        if(crossOverPath.path.length > 50)
        {
          console.log("crossOver");
        }
        newG.paths.push(crossOverPath);
        

      }

      // console.log("Fittest Route after generation {0}: fitness {1}", i, newG.FittestRoute.Fitness));
      //Console.WriteLine(String.Format("Fittest Route after generation {0}: least fitness {1}", i, newG.UnFittestRoute.Fitness));
      currG = newG;

      this.broadcast.next(i);

    }

    return Observable.of(currG.FittestPath().path);

    // Console.WriteLine("route: " + currG.FittestRoute.ToString());

  }


}
