
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterServiceService } from 'src/app/auth-service/registerservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public registerService: RegisterServiceService) {

  }

  ngOnInit(): void {

  }



  logOut(){

    const token = localStorage.getItem("token")
    console.log(token)
      return this.registerService.logOut(token!).subscribe(data => {
        localStorage.removeItem("token")
        this.router.navigate(['login'])
        console.log(data)
      })


  }

}
