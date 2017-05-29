import { Path } from './path';
import { SettingsService } from './settings.service';
import * as _ from 'underscore';

export class Generation {

    paths: Path[] = <Path[]>[];
    generationNumber : number;

    constructor(private settingsService: SettingsService) { }

    public RunTournament(): Path {

            // var contestants = routes.OrderBy(x => Guid.NewGuid()).Take(HelperClass.tournamentSize);
            // return contestants.OrderBy(c => c.Fitness).First();

        // randomly pick tournaments
        let contestants = _.first(_.shuffle(this.paths), this.settingsService.tournamentSize);

        // get the best one 
        return  _.sortBy(contestants, (p)=>p.Fitness)[0];

    }

    public FittestPath(): Path {
        let sorted = _.sortBy(this.paths, (p) => p.Fitness());

        return sorted[0];
    }

    public UnFittestPath(): Path {
        let sorted = _.sortBy(this.paths, (p) => p.Fitness() * -1);
        return sorted[0];
    }

}
