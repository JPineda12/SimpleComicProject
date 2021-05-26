import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
@Component({
  selector: 'app-ingresar-comic',
  templateUrl: './ingresar-comic.component.html',
  styleUrls: ['./ingresar-comic.component.css']
})
export class IngresarComicComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  years: any;
  primerYear = 1901;
  ultimoYear = 2021;
  idUser: number = -1;
  Editoriales: any[] = [];
  resMessage: string = "";
  errorMessage: string = "";
  ngOnInit(): void {
    this.idUser = JSON.parse(localStorage.getItem("user") || '{}').idUsuario;
    this.years = []
    this.Editoriales = []
    this.llenarYears();
    this.llenarEditoriales();
  }

  grabar() {
    let year = ((document.getElementById("years") as HTMLInputElement).value);
    let editorial = ((document.getElementById("editorial") as HTMLInputElement).value);
    let nombre = ((document.getElementById("name") as HTMLInputElement).value);
    let sinopsis = ((document.getElementById("sinopsis") as HTMLInputElement).value);
    if (nombre == "" || year == "" || sinopsis == "") {
      this.errorMessage = "Error - Llene todos los campos";
      this.resMessage = "";
    } else {
      this.apiService.postComic(nombre, year, sinopsis, +editorial, this.idUser).subscribe(res => {
        let resultado: any = res;
        if (resultado.post == "true") {
          this.resMessage = nombre + " grabado satisfactoriamente!";
          this.errorMessage = "";
          (document.getElementById("years") as HTMLInputElement).value = "1901";
          (document.getElementById("editorial") as HTMLInputElement).value = "";
          (document.getElementById("name") as HTMLInputElement).value = "";
          (document.getElementById("sinopsis") as HTMLInputElement).value = "";
        } else {
          this.errorMessage = "Ocurrio un error al intentar grabar";
          this.resMessage = ""
        }
      })
    }
  }

  llenarEditoriales() {

    this.apiService.getEditoriales().subscribe(res => {
      let data: any = res;

      for (let i = 0; i < data.length; i++) {
        let ed: any = {
          id: data[i].idEditorial,
          nombre: data[i].nombre
        }
        this.Editoriales.push(ed);
      }
    })
  }

  llenarYears() {
    for (let i = this.primerYear; i <= this.ultimoYear; i++) {
      this.years.push(i);
    }
  }

}
