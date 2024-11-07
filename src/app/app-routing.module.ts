import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { VehiculoComponent } from './modulos/vehiculo/vehiculo.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { PagoComponent } from './modulos/pago/pago.component';
import { AlquilerComponent } from './modulos/alquiler/alquiler.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { LoginComponent } from './modulos/login/login.component';
import { validaruserGuard } from './guard/validaruser.guard';


const routes: Routes = [
  {
     path: '', component: PrincipalComponent,
     children: [
      {path: 'dashboard', component: DashboardComponent,canActivate:[validaruserGuard]},
      {path: 'vehiculo', component: VehiculoComponent, canActivate:[validaruserGuard]},
      {path: 'cliente', component: ClienteComponent, canActivate:[validaruserGuard]},
      {path: 'pago', component: PagoComponent, canActivate:[validaruserGuard]},
      {path: 'alquiler', component: AlquilerComponent, canActivate:[validaruserGuard]},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
     ]
  },

      {path:'login', component: LoginComponent},
      {path:'**', component: NoEncontroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
