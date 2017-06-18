import { SettingsService } from './settings.service';
import { Destination } from './destination';
import * as _ from 'underscore';

export class Path {
    path: Destination[] = <Destination[]>[];

    constructor(private settingsService: SettingsService, private prePopulate: Boolean = true) {
        if (prePopulate)
            this.path = _.shuffle(this.settingsService.AllDestinations);

    }


    private getDist(startDest: Destination, endDest: Destination): number {
        let xd = startDest.PointX - endDest.PointX;
        let yd = startDest.PointY - endDest.PointY;
        return Math.sqrt(xd * xd + yd * yd);

    }
    public Fitness(): number {

        let fitness = 0;

        for (let i = 0; i < this.path.length - 1; i++) {
            let startDest = this.path[i];
            let endDest = this.path[i + 1];

            let dist = this.getDist(startDest, endDest);
            fitness = fitness + dist;

        }
        // calculate back to base
        fitness = fitness + this.getDist(this.path[0], this.path[this.path.length - 1]);



        return fitness;


    }

    get ToString(): String {
        let output = "";
        
        for(let d of this.path)
        {
            output += d.Id + " "

        }
        return output


    }
}
