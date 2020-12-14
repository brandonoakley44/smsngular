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



  constructor() {

    var connected = false;
    // this._socket = io(this._socketUrl, { reconnect: true});
    //this._socket = io.connect('https://marketdata.tradermade.com', {reconnect: true});
    var socket = io.connect('https://marketdata.tradermade.com', {reconnect: true});
    socket.on('connect', function () {
     console.log('Connected! Please CTRL+C and restart if you see this messsage more than twice');
     console.log('disconnecting and reconnecting can take upto a minute');
     console.log('.......');
     socket.emit('login', {userKey: "sio4gh_OXEqW2T05-JnQA"});

     });

     socket.on('disconnect', function (msg) {
      console.log(msg);
     });

     socket.on('handshake', function (msg) {
      console.log(msg);
      connected = true;
      socket.emit("symbolSub", {symbol: "USDJPY"});
      socket.emit("symbolSub", {symbol: "GBPUSD"});
      socket.emit("symbolSub", {symbol: "EURUSD"});

    });

    socket.on('subResponse', function (msg) {
      console.log(msg)

    });


    socket.on('price', function (message){
      var data = message.split(" ")
      console.log(data[0] + " " + data[1] + " " + data[2] + " " + data[3] + " ")

    });






   }



}
