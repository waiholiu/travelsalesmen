import { SettingsService } from './settings.service';
import { Destination } from './destination';


export class Path {
    path: Destination[] = <Destination[]>[];

    constructor(private settingsService: SettingsService, private prePopulate: Boolean = true) {
        if (prePopulate)
            this.path = this.settingsService.AllDestinations;
            
    }

    public Fitness(): number {

        let fitness = 0;

        for (let i = 0; i < this.path.length - 1; i++) {
            let startDest = this.path[i];
            let endDest = this.path[i + 1];
            
            let xd = startDest.PointX - endDest.PointX;
            let yd = startDest.PointY - endDest.PointY;
            let dist =  Math.sqrt(xd * xd + yd * yd);
            fitness = fitness + dist;

        }

        return fitness;


    }

    // public override string ToString()
    // {
    //     StringBuilder returnStr = new StringBuilder();
    //     foreach (var d in path) {
    //         returnStr.Append(d.x + " ");
    //     }
    //     return returnStr.ToString();
    // }
}
