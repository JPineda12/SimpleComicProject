import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  Editoriales: any[] = [];
  resMessage: string = "";
  errorMessage: string = "";
  comic: any;
  selectedEditorial: any
  selectedYear: any;
  years: any;
  primerYear = 1901;
  ultimoYear = 2021;
  ngOnInit(): void {
    this.comic = JSON.parse(localStorage.getItem("comic") || '{}');
    console.log(this.comic);
    this.Editoriales = [];
    this.years = [];
    this.llenarEditoriales();
    this.llenarYears();
    (document.getElementById("name") as HTMLInputElement).value = this.comic.nombre;
    (document.getElementById("sinopsis") as HTMLInputElement).value = this.comic.sinopsis;
    (document.getElementById("years") as HTMLInputElement).value = this.comic.year;
  }

  grabar() {
    let nombre = ((document.getElementById("name") as HTMLInputElement).value);
    let sinopsis = ((document.getElementById("sinopsis") as HTMLInputElement).value);
    console.log("selected: ", this.selectedYear.year);
    console.log("selectedEd: ", this.selectedEditorial.id);
    console.log(nombre);
    console.log(sinopsis);
    if (nombre == "" || sinopsis == "") {
      this.errorMessage = "Error - Llene todos los campos";
      this.resMessage = "";
    } else {

      this.apiService.updateComic(nombre, this.selectedYear.year, sinopsis,
        this.selectedEditorial.id, this.comic.idComic)
        .subscribe(res => {
          let resultado: any = res;
          if(resultado.actualizado == "true"){
            this.resMessage = "Comic actualizado satisfactoriamente!";
            this.errorMessage = "";
            this.comic.nombre = nombre;
            this.comic.editorial = this.selectedEditorial.nombre;
            this.comic.imagen = this.selectedEditorial.imagen;
            this.comic.sinopsis = sinopsis;
            this.comic.year = this.selectedYear.year;
            localStorage.setItem("comic", JSON.stringify(this.comic));
          }else{
            this.errorMessage = "Ocurrio un error al actualizar el comic";
            this.resMessage = "";
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
          nombre: data[i].nombre,
          imagen: data[i].imagen
        }
        this.Editoriales.push(ed);
        if (ed.nombre == this.comic.editorial) {
          this.selectedEditorial = ed;
        }
      }
    })
  }
  llenarYears() {
    for (let i = this.primerYear; i <= this.ultimoYear; i++) {
      let auxYear: any = {
        year: i
      }
      this.years.push(auxYear);
      if (i == this.comic.year) {
        this.selectedYear = auxYear;
      }
    }
  }

}
