import { Component } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent {
  cliente:any;
  id_cliente:any

  obj_cliente={
    id_cliente: 0,
    nombre: '',
    apellidos: '',
    cedula:0,
    ciudad: '',
    direccion: '',
    correo_electronico: ''
  }

  validar_id_cliente = true;
  validar_nombre = true;
  validar_apellidos = true;
  validar_cedula = true;
  validar_ciudad = true;
  validar_direccion = true;
  validar_correo_electronico = true;
  mformu=false;
  botones_form=false;
  

  constructor(private sclien:ClienteService) {}
 
  ngOnInit() : void{
 this.consulta();
  }
 
  consulta(){
   this.sclien.consultar().subscribe((resultado:any)=>{
     this.cliente = resultado;
   })
  }
  mostrar_formu(dato:any){
    switch(dato){
      case 'ver':
        this.mformu = true;
        break;
      case 'no ver':
        this.mformu = false;
        this.botones_form=false;
        break;
    }}
  limpiar(){
    this.obj_cliente={
      id_cliente: 0,
      nombre: '',
      apellidos: '',
      cedula:0,
      ciudad: '',
      direccion: '',
      correo_electronico: ''
    }
  }

  validar2(funcion:any){
    if (this.obj_cliente.id_cliente == 0){ 
      this.validar_id_cliente = false;
    }
    else{
      this.validar_id_cliente = true;
    }

    if (this.obj_cliente.nombre == ""){ 
      this.validar_nombre= false;
    }
    else{
      this.validar_nombre= true;
    }

    if (this.obj_cliente.apellidos == ""){ 
      this.validar_apellidos= false;
    }
    else{
      this.validar_apellidos= true;
    }

    if (this.obj_cliente.cedula == 0){ 
      this.validar_cedula = false;
    }
    else{
      this.validar_cedula = true;
    }

    if (this.obj_cliente.ciudad == ""){ 
      this.validar_ciudad = false;
    }
    else{
      this.validar_ciudad = true;
    }

    if (this.obj_cliente.direccion == ""){ 
      this.validar_direccion= false;
    }
    else{
      this.validar_direccion= true;
    }

    if (this.obj_cliente.correo_electronico == ""){ 
      this.validar_correo_electronico= false;
    }
    else{
      this.validar_correo_electronico= true;
    }

    if(this.validar_id_cliente==true && this.validar_nombre==true && this.validar_apellidos==true && this.validar_cedula==true && this.validar_ciudad==true && this.validar_direccion==true && this.validar_correo_electronico==true && funcion=='guardar'){
      this.guardar()
    }
    if(this.validar_id_cliente==true && this.validar_nombre==true && this.validar_apellidos==true && this.validar_cedula==true && this.validar_ciudad==true && this.validar_direccion==true && this.validar_correo_electronico==true && funcion=='editar'){
      this.editar()
    }
}

guardar(){
  this.sclien.insertar(this.obj_cliente).subscribe((datos:any)=>{
    if(datos ['resultado']=='OK'){
      this.consulta();
      }
  });
  this.limpiar();
  this.mostrar_formu('no ver');
}
eliminar(id:number){
  Swal.fire({
    title: "¿Estas seguro de eliminar el Cliente?",
    text: "¡El proceso no sera reversible!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Si Eliminar!",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      /////////////////
      this.sclien.eliminar(id).subscribe((datos:any)=>{
        if(datos['resultado']=="OK")
      this.consulta();
       });

      ////////////////
      Swal.fire({
        title: "¡Eliminado!",
        text: "¡El Cliente ha sido eliminado!",
        icon: "success"
      });
    }
  });
  
  
  //console.log(id);
 
  }

  cargar_datos(items:any, id:number){
    this.obj_cliente={
      id_cliente: items.id_cliente,
      nombre: items.nombre,
      apellidos: items.apellidos,
      cedula: items.cedula,
      ciudad: items.ciudad,
      direccion: items.direccion,
      correo_electronico: items.correo_electronico
    };
    this.id_cliente = id;
    this.botones_form=true;
    this.mostrar_formu('ver');
  }

  editar(){
    this.sclien.editar(this.id_cliente, this.obj_cliente).subscribe((datos:any)=>{
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_formu('no ver');
  }
}
