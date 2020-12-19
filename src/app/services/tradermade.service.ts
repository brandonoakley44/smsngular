import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TradermadeService {

  private _socketUrl: string = 'https://marketdata.tradermade.com';


  private _socket;

  private connected = false;

  parseDate(dateString){
    var reggie = /(\d{4})(\d{2})(\d{2})-(\d{2}):(\d{2}):(\d{2}).(\d{3})/;
    var dateArray = reggie.exec(dateString);
    var dateObject = new Date(
    (+dateArray[1]),
    (+dateArray[2])-1, // Careful, month starts at 0!
    (+dateArray[3]),
    (+dateArray[4]),
    (+dateArray[5]),
    (+dateArray[6])
    );
    return dateObject
  }



  //Implemented connecction to tradermade API service using socket.io-client npm package.
  constructor() {


    this._socket = io.connect('https://marketdata.tradermade.com', {reconnect: true});
    this._socket.on('connect',  () => {
     console.log('Connected! Please CTRL+C and restart if you see this messsage more than twice');
     console.log('disconnecting and reconnecting can take upto a minute');
     console.log('.......');
     this._socket.emit('login', {userKey: "sio4gh_OXEqW2T05-JnQA"});

     });

     this._socket.on('disconnect', (msg) => {
      console.log(msg);
     });



    this._socket.on('subResponse',  (msg) => {
      console.log(msg)

    });


    this._socket.on('price', (message) => {
      var data = message.split(" ")
      console.log(data[0] + " " + data[1] + " " + data[2] + " " + data[3] + " " + "helloWorld")

    });


   }





  subscribeToStocks(data: string[]): Observable<any[]> {
    if ( data ) {
      for (let stock of data) {
        this._socket.emit("symbolSub", { symbol: `${stock}`});
      }
    }
    return Observable.create(observer => {
      this._socket.on('price', (message) => {
        var data = message.split(" ");
        //Initialize a stock variable
        //stream it
        observer.next(data);
      });
    });
  }



}
