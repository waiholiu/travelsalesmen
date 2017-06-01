import { SettingsService } from './../settings.service';
import { CalculateService } from './../calculate.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Destination } from "app/destination";
import * as _ from 'underscore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public settingService: SettingsService, private calculateService: CalculateService) { }

  canvasWidth: number = 400;
  canvasHeight: number = 600;

  context: CanvasRenderingContext2D;

  @ViewChild("myCanvas") myCanvas;

  destinations: Destination[] = [];
  bestRoute: Destination[];
  mode: String = "new";

  NotInMode(acceptableModes : String[]): Boolean
  {
    return acceptableModes.indexOf(this.mode) < 0;
  }

  ngOnInit() {


  }

  bestDistance: number;
  currentGeneration: number;

  get noOfCombinations(): number {
    return this.rFact(this.settingService.RouteLength - 1) / 2;

  }
  get noOfTests(): number {
    return this.settingService.NoOfGenerations * this.settingService.TotalPopulation;

  }

  private rFact(num): number {
    if (num === 0)
    { return 1; }
    else
    { return num * this.rFact(num - 1); }
  }

  onGenerate() {
    let canvas = this.myCanvas.nativeElement;

    this.context = canvas.getContext("2d");
    this.destinations = [];
    for (let i = 0; i < this.settingService.RouteLength; i++) {
      let _x = Math.floor(Math.random() * this.canvasWidth);
      let _y = Math.floor(Math.random() * this.canvasHeight);
      let dot = <Destination>{ PointX: _x, PointY: _y, Id: i }
      this.destinations.push(dot);

    }

    this.drawDots();

    this.mode = "generated";

  }

  onStop() {

    this.calculateService.toStop = true;
    this.mode = "stop";
    // this.calculateService.broadcast.unsubscribe();

  }

  onStart() {
    this.mode = "run";
    this.calculateService.toStop = false;

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
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

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

    // plot back to beginning
    this.context.lineTo(route[0].PointX, route[0].PointY);


    this.context.stroke();


  }

}
