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

  public broadcast: Subject<Generation> = new Subject<Generation>();
  public toStop = false;



  public CalculateBestRoute(destinations: Destination[]) {

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


    let savedTimeouts = [];


    // start to evolve
    for (let i = 0; i < this.settingsService.NoOfGenerations; i++) {

      savedTimeouts.push(setTimeout(() => {
        
        // stop taking up resources when i hit stop
        if (this.toStop) {
          for(let t of savedTimeouts)
          {
            clearTimeout(t);
          }
          return;
        }

        // create the nex generation
        let newG = new Generation(this.settingsService);

        newG.generationNumber = i;
        // if we want to have eliteism.

        if(this.settingsService.IsElitist)
          newG.paths.push(currG.FittestPath());

        // get new generation of routes
        for (let j = this.settingsService.IsElitist ? 1 : 0; j < this.settingsService.TotalPopulation; j++) {

          // select two routes via tournament selection
          let parent1 = currG.RunTournament();
          let parent2 = currG.RunTournament();

          // run crossover
          let crossOverPath = this.settingsService.RunCrossOver(parent1, parent2);

          newG.paths.push(crossOverPath);
          
        }

        currG = newG;
        this.broadcast.next(newG);

      }, 1));





    }

    return Observable.of(currG.FittestPath().path);

  }


}
