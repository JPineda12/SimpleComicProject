import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  errorMessage = ""
  ngOnInit(): void {
  }

  registrar(){
    let nickname = ((document.getElementById("user") as HTMLInputElement).value);
    let nombre = ((document.getElementById("name") as HTMLInputElement).value);
    let fecha = ((document.getElementById("fecha") as HTMLInputElement).value);
    let pass = ((document.getElementById("login-pass") as HTMLInputElement).value);
    let genero = ""
    if((document.getElementById("male") as HTMLInputElement).checked){
      genero = "Masculino"
      this.errorMessage = "";
    }else if((document.getElementById("female") as HTMLInputElement).checked){
      genero = "Femenino"
      this.errorMessage = "";
    }else{
      this.errorMessage = "Seleccione un Sexo";
    }

    if(nickname == "" || fecha == "" || pass == "" || nombre ==""){
      this.errorMessage = "Llene todos los campos";
    }
    if(pass.length < 6){
      this.errorMessage = "La contraseña debe tener al menos 6 caracteres"
    }
    

    if(this.errorMessage == ""){
      this.apiService.postUser(nombre, nickname, pass, fecha, genero).subscribe(res => {
        console.log(res);
        let resultado: any = res;
        if(resultado.post == "true"){
          console.log("registrado");
          this.router.navigate(["/login"]);
        }else{
          this.errorMessage = "Error de registro";
        }

      });
    }

  }



}
