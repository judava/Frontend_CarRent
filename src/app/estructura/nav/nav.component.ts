import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
nombre:any
rol:any;


constructor(private router:Router){}

ngOnInit(): void {
  if(typeof window !== 'undefined'){
    this.nombre=sessionStorage.getItem('nombre');
    this.rol=sessionStorage.getItem('rol');
  }
}
cerrar(){
  sessionStorage.setItem('id',"");
  sessionStorage.setItem('email',"");
  sessionStorage.setItem('nombre',"");
  sessionStorage.setItem('rol',"");
  this.router.navigate(['login']);
  
}

}
