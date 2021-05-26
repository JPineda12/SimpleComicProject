
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest } from "@angular/common/http";
import { map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  API_URI = "http://localhost:3000"

  getComics() {
    return this.http.get(`${this.API_URI}/api/comics`);
  }

  getEditoriales() {
    return this.http.get(`${this.API_URI}/api/editoriales`);
  }

  loginUser(nombre: string, pass: string) {
    return this.http.post(`${this.API_URI}/api/login`,
      {
        "user": nombre,
        "pass": pass
      }, { headers: this.headers }).pipe(map(data => data));
    }

    postComic(nombre: string, year: string, sinopsis: string, idEditorial: number, idUser: number){
      return this.http.post(`${this.API_URI}/api/postComic`,
      {
        "nombre": nombre,
        "year": year,
        "sinopsis": sinopsis,
        "idEditorial": idEditorial,
        "idUser": idUser
      }, { headers: this.headers }).pipe(map(data => data));
    }

    updateComic(nombre: string, year: string, sinopsis: string, idEditorial: number, idComic: number){
      return this.http.put(`${this.API_URI}/api/updateComic`,
      {
        "nombre": nombre,
        "year": year,
        "sinopsis": sinopsis,
        "idEditorial": idEditorial,
        "idComic": idComic
      }, { headers: this.headers }).pipe(map(data => data));
    }

    deleteComic(idComic: number){
      return this.http.delete(`${this.API_URI}/api/deleteComic/${idComic}`)
    }

    postUser(nombre: string, nickname: string, pass: string, fecha: string, sexo: string){
      return this.http.post(`${this.API_URI}/api/register`,
      {
        "nombre": nombre,
        "nickname": nickname,
        "pass": pass,
        "fecha": fecha,
        "sexo": sexo
      }, { headers: this.headers }).pipe(map(data => data));
    }

    

}
