import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = { title: '', first_name: '', last_name: '', picture: '' }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe( //structure of response: res.results[0].name attributes (title, first, and last)
      (res: any) => {
       // this.user = res.data;
        console.log(res.results[0].name.first);
        console.log(res.results[0].name.last);
        console.log(res.results[0].name.title);
        console.log(res.results[0].picture.medium);
       this.user.title = res.results[0].name.title;
       this.user.first_name = res.results[0].name.first;
        this.user.last_name = res.results[0].name.last;
        this.user.picture = res.results[0].picture.medium;
        console.log(this.user);
      }
    )
  }

}
