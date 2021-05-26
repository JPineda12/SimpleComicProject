import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../../services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  errorMessage = ""
  ngOnInit(): void {
  }

  login(){
    let nickname = ((document.getElementById("login-name") as HTMLInputElement).value);
    let pass = ((document.getElementById("login-pass") as HTMLInputElement).value);
    (document.getElementById("login-pass") as HTMLInputElement).value = "";

    this.apiService.loginUser(nickname, pass).subscribe(res => {
      let us : any = res;
      if(us.length > 0) {
        localStorage.setItem("user", JSON.stringify(us[0]))
        this.router.navigate(["/home"]);
      }else{
        //Error
        this.errorMessage = "Error - Credenciales Incorrectas";
        console.log("Error de login");
      }
    })


  }

}
