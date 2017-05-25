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

        // for (let i = 0; i < this.path.length - 1; i++) {
        //     Destination startDest = path[i];
        //     Destination endDest = path[i + 1];
        //     var dist = Math.Abs(endDest.x - startDest.x);
        //     fitness = fitness + dist;

        // }

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
