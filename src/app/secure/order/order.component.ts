import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  form: FormGroup;

  constructor( private formBuilder: FormBuilder, private router: Router ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      usd: '',
      gbp: '',
      eur: ''
    });

  }


  submit() {
    const data = this.form.getRawValue();
    console.log(data);

    var usd = data.usd;
    var gbp = data.gbp;
    var eur = data.eur;

    console.log("usd" + usd);
    console.log("gbp" + gbp );
    console.log("eur" + eur);

    if (usd === true) {
      localStorage.setItem('usd', usd);
    }

    if ( gbp === true ) {
      localStorage.setItem('gbp', gbp);
    }

    if ( eur === true ) {
      localStorage.setItem('eur', eur);
    }

      if ( usd === false ) {
        localStorage.removeItem('usd');
      }

      if ( gbp === false ) {
        localStorage.removeItem('gbp');
      }

      if ( eur === false ) {
        localStorage.removeItem('eur');
      }

      if ( usd === "" ){
        if ( localStorage.getItem('usd')) {
          localStorage.removeItem('usd');
        }
      }

      if ( gbp === "" ) {
        if ( localStorage.getItem('gbp')){
          localStorage.removeItem('gbp');
        }
      }

      if ( eur === "" ) {
        if ( localStorage.getItem('eur')){
          localStorage.removeItem('eur');
        }
      }



    // Set the tokens and then redirect...

    this.router.navigate(['/stocks']);


  }

}
