import { Component, OnInit } from '@angular/core';
import { TradermadeService } from 'src/app/services/tradermade.service';
import 'chartjs-plugin-streaming';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Stock } from 'src/app/interfaces/stock';

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

  public datasets: ChartDataSets[] = [
    { data: [], label: 'Stock', fill: false , lineTension: 0 },
    { data: [], label: 'Other', fill: false , lineTension: 0 },
  ];

  public lineChartLabels: Label[] = [];


  options: any = {
    responsive: true,
    scales: {
      xAxes: [{
      type: 'realtime',
       realtime: {
         onRefresh: function(chart:any) {
           chart.data.datasets.forEach(function(dataset: any) {
             dataset.data.push({
               x: Date.now(),
               y: Math.random()
             });
           });
         },
         delay: 2000
       }
      }]
    }

  };

  private stockInfo;

  constructor( private traderAPIservice: TradermadeService ) { }

  ngOnInit(): void {
    this.subscribedStocks = ["USDJPY" , "GBPUSD", "EURUSD"];
   // this.traderAPIservice.subscribeToStock(this.subscribedStocks).sub;
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
