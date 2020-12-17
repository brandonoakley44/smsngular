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

//Stocks that the user may subscribe to
  USDJPY: Stock;
  GBPUSD: Stock;
  EURUSD: Stock;


  //ng2-charts with a straming plugin for real-time x axis
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
  this.traderAPIservice.juggernaut();

  }

}
