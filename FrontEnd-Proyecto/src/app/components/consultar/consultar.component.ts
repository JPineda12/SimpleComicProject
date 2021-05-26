import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { Router } from '@angular/router';
import swal from 'sweetalert2'
@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }


  Comics: any;
  Usuario: any;
  ngOnInit(): void {
    this.Usuario = JSON.parse(localStorage.getItem("user") || '{}');
    this.Comics = []
    this.getComics();
  }


  getComics() {

    this.apiService.getComics().subscribe(res => {
      let auxCom: any = res;
      for (let i = 0; i < auxCom.length; i++) {
        let c = auxCom[i]
        let isUser: boolean
        if(c.idUsuario == this.Usuario.idUsuario){
          isUser = true;
        }else{
          isUser = false;
        }
        let tempCom: any = {
          imagen: c.imagen,
          nombre: c.nombre,
          year: c.year_impresion,
          idComic: c.idComic,
          editorial: c.Editorial,
          idusuario: c.idUsuario,
          sinopsis: c.sinopsis,
          isUsuario: isUser
        }
        this.Comics.push(tempCom);
      }
    })
  }

  editar(comic: any) {
    localStorage.setItem("comic", JSON.stringify(comic));
    this.router.navigate(["/editar"]);
  }

  eliminar(comic: any) {
    swal.fire({
      title: '¿Eliminar ' + comic.nombre,
      text: "No se podra revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar comic'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteComic(comic.idComic).subscribe(data => {
          let resultado: any = data;
          if (resultado.deleted == "true") {
            swal.fire(
              'Deleted!',
              'El comic se ha eliminado.',
              'success'
            )
            const index = this.Comics.indexOf(comic, 0);
            if (index > -1) {
              this.Comics.splice(index, 1);
            }
          } else {
            swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrio un error al eliminar el comic - No se elimino nada',
            })
          }
        })

      }
    })
  }
}
