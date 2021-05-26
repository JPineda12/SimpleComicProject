import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarComponent } from './components/consultar/consultar.component';
import { EditComponent } from './components/consultar/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { IngresarComicComponent } from './components/ingresar-comic/ingresar-comic.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoggedInGuard } from './services/logged-in.guard';
const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'register',
    component: RegisterComponent,

  },
  {

    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard]
  },

  {
    path: 'consultar',
    component: ConsultarComponent,
    canActivate: [LoggedInGuard]
  },

  {
    path: 'ingresar',
    component: IngresarComicComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'editar',
    component: EditComponent,
    canActivate: [LoggedInGuard]
  },

  {

    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },

  {

    path: '**',

    redirectTo: "/login",

    pathMatch: 'full'

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
