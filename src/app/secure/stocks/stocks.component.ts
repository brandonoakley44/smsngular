import { Component, OnInit } from '@angular/core';
import { TradermadeService } from 'src/app/services/tradermade.service';
import 'chartjs-plugin-streaming';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Stock } from 'src/app/interfaces/stock';
import * as CanvasJS from './canvasjs.min';
import * as $ from 'jquery';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  private subscribedStocks: string[] = [];

  USDJPY : Stock = { symbol: "USDJPY", bid: "", mid: "" , ask: "" };
  GBPUSD : Stock = { symbol: "GBPUSD", bid: "", mid: "" , ask: "" };
  EURUSD : Stock = { symbol: "EURUSD", bid: "", mid: "" , ask: "" };

  usdIsSubscribed: boolean = false;
  gbpIsSubscribed: boolean = false;
  eurusdIsSubscribed: boolean = false;

  public usd: ChartDataSets[] = [
   // { data: [], label: 'Stock', fill: false , lineTension: 0 },
    { data: [], label: 'USDJPY', fill: false , lineTension: 0 },

  ];

  public gbp: ChartDataSets[] = [
    // { data: [], label: 'Stock', fill: false , lineTension: 0 },
     { data: [], label: 'GBPUSD', fill: false , lineTension: 0 },

   ];

   public eur: ChartDataSets[] = [
    // { data: [], label: 'Stock', fill: false , lineTension: 0 },
     { data: [], label: 'EURUSD', fill: false , lineTension: 0 },

   ];



  public lineChartLabels: Label[] = [];


  options: any = {
    responsive: true,
    scales: {
      xAxes: [{
      type: 'realtime',

      }]
    },
    plugins: {
      streaming: {            // enabled by default
          duration: 20000,    // data in the past 20000 ms will be displayed
          refresh: 1000,      // onRefresh callback will be called every 1000 ms
          delay: 1000,        // delay of 1000 ms, so upcoming values are known before plotting a line
          test: this.GBPUSD.mid,

          // a callback to update datasets
          onRefresh: function(chart) {
              chart.data.datasets[0].data.push({
                  x: Date.now(),
                  y: Math.random() * 100
              });
          }}
      }
  };

  private stockInfo;

  constructor( private traderAPIservice: TradermadeService ) { }

  ngOnInit(): void {



    if ( localStorage.getItem('usd')) {
      this.subscribedStocks.push("USDJPY");
      this.usdIsSubscribed = true;
    } else {
      this.usdIsSubscribed = false;
    }

    if ( localStorage.getItem('gbp')) {
      this.subscribedStocks.push("GBPUSD");
      this.gbpIsSubscribed = true;
    } else {
      this.gbpIsSubscribed = false;
    }

    if ( localStorage.getItem('eur')) {
      this.subscribedStocks.push("EURUSD");
      this.eurusdIsSubscribed = true;
    } else {
      this.eurusdIsSubscribed = false;
    }





    this.traderAPIservice.subscribeToStocks(this.subscribedStocks).subscribe(
      stocks =>  this.setStocks(stocks) //console.log(stocks + "in the stocks component:) ")
    )
  }


  setStocks(subStocks): any {
    if ( subStocks[0] === "USDJPY" ) {
      this.USDJPY.bid = subStocks[1];
      this.USDJPY.mid = subStocks[2];
      this.USDJPY.ask = subStocks[3];
      console.log(this.USDJPY);
    }
    else if ( subStocks[0] === "GBPUSD" ) {
      this.GBPUSD.bid = subStocks[1];
      this.GBPUSD.mid = subStocks[2];
      this.GBPUSD.ask = subStocks[3];
      console.log("GBPUSB");
    }
    else {
      this.EURUSD.bid = subStocks[1];
      this.EURUSD.mid = subStocks[2];
      this.EURUSD.ask = subStocks[3];
      console.log("EURUSD");
    }
  }



}
