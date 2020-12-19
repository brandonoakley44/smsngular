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
      usdjpy: '',
      gbpusd: '',
      eurusd: ''
    });

  }


  submit() {
    const data = this.form.getRawValue();
    console.log(data);


    // Set the tokens and then redirect...

    this.router.navigate(['/stocks']);


  }

}
