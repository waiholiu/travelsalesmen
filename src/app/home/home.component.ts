import { SettingsService } from './../settings.service';
import { CalculateService } from './../calculate.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Destination } from "app/destination";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private settingService : SettingsService, private calculateService: CalculateService) { }

  canvasWidth: number = 600;
  canvasHeight: number = 400;

  context: CanvasRenderingContext2D;

  @ViewChild("myCanvas") myCanvas;

  destinations: Destination[] = [];
  bestRoute: Destination[];

  ngOnInit() {
    let canvas = this.myCanvas.nativeElement;

    this.context = canvas.getContext("2d");

    for (let i = 0; i < this.settingService.RouteLength; i++) {
      let _x = Math.floor(Math.random() * 600);
      let _y = Math.floor(Math.random() * 600);
      let dot = <Destination>{ PointX: _x, PointY: _y, Id: i }
      this.destinations.push(dot);

    }

    this.drawDots();

  }

  bestDistance : number;
  currentGeneration : number;


  onStop() {

    this.calculateService.toStop = true;

  }

  onStart() {


    this.calculateService.broadcast.subscribe(
      data => {
          this.drawDots();
          this.plotBestRoute(data.FittestPath().path);
          this.bestDistance = data.FittestPath().Fitness();
          this.currentGeneration = data.generationNumber;
      
      });

    this.calculateService.CalculateBestRoute(this.destinations);

  }

  private drawDots() {
    this.context.clearRect(0, 0, 600, 600);

    for (let dot of this.destinations) {
      this.context.fillRect(dot.PointX, dot.PointY, 5, 5);
    }

  }

  private plotBestRoute(route: Destination[]) {
    this.context.beginPath();

    let isStart: Boolean = true;
    for (let d of route) {
      if (isStart) {
        this.context.moveTo(d.PointX, d.PointY);
        isStart = false;
      }
      else {
        this.context.lineTo(d.PointX, d.PointY);
      }

    }


    this.context.stroke();


  }

}
