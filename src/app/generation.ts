import { Path } from './path';
import { SettingsService } from './settings.service';
import * as _ from 'underscore';

export class Generation {

    paths: Path[] = <Path[]>[];
    generationNumber: number;

    constructor(private settingsService: SettingsService) { }

    public RunTournament(): Path {

        // randomly pick tournaments
        let contestants = _.first(_.shuffle(this.paths), this.settingsService.tournamentSize);

        // get the best two to be the first parents 
        return _.sortBy(contestants, (p) => p.Fitness())[0];

    }

    public FittestPath(): Path {
        let sorted = _.sortBy(this.paths, (p) => p.Fitness());

        return sorted[0];
    }

    public AverageFitness(): number {
        return _.reduce(this.paths, function (memo, num) {
            return  memo + num.Fitness();
        }, 0) / this.paths.length;

    }

    public UnFittestPath(): Path {
        let sorted = _.sortBy(this.paths, (p) => p.Fitness() * -1);
        return sorted[0];
    }

    public PathsSortedByFitness() : Path[]
    {
        return _.sortBy(this.paths, (p) => p.Fitness());
    }

}
