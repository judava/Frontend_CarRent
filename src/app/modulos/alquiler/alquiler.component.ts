import { Component } from '@angular/core';
import { AlquilerService } from '../../servicios/alquiler.service';
import { AutoService } from '../../servicios/auto.service';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alquiler',
  templateUrl: './alquiler.component.html',
  styleUrl: './alquiler.component.scss'
})
export class AlquilerComponent {

  alquiler:any;
  auto: any;
  cliente: any;
  id_alquiler: any;

  obj_alquiler={
    id_alquiler:0,
    fecha:Date,
    duracion:0,
    precio:0,
    fo_auto:0,
    fo_cliente:0
  };

validar_id_alquiler= true;
validar_fecha= true;
validar_duracion= true;
validar_precio= true;
validar_auto= true;
validar_cliente= true;
mform= false;
botones_form= false;
 constructor(private salqui:AlquilerService,private sauto:AutoService, private scliente:ClienteService) {}

 ngOnInit() : void{
this.consulta();
this.consulta_a();
this.consulta_c();
 }

 consulta(){
  this.salqui.consultar().subscribe((resultado:any)=>{
    this.alquiler = resultado;
  })
}
consulta_a(){
  this.sauto.consultar().subscribe((resultado:any)=>{
    this.auto = resultado;
  })
}
consulta_c(){
  this.scliente.consultar().subscribe((resultado:any)=>{
    this.cliente = resultado;
  })
}
mostrar_form(dato:any){
  switch(dato){
    case 'mostrar':
      this.mform = true;
      break;
    case 'ocultar':
      this.mform = false;
      this.botones_form= false;
      break;
  }
}

limpiar(){
  this.obj_alquiler={
    id_alquiler:0,
    fecha:Date,
    duracion:0,
    precio:0,
    fo_auto:0,
    fo_cliente:0
  };
}

validar(funcion:any){
  if (this.obj_alquiler.id_alquiler == 0){ 
    this.validar_id_alquiler = false;
  }
  else{
    this.validar_id_alquiler = true;
  }

  if (this.obj_alquiler.fecha == Date){ 
    this.validar_fecha = false;
  }
  else{
    this.validar_fecha = true;
  }

  if (this.obj_alquiler.duracion == 0){ 
    this.validar_duracion = false;
  }
  else{
    this.validar_duracion = true;
  }

  if (this.obj_alquiler.duracion == 0){ 
    this.validar_duracion = false;
  }
  else{
    this.validar_duracion = true;
  }

  if (this.obj_alquiler.precio == 0){ 
    this.validar_precio = false;
  }
  else{
    this.validar_precio = true;
  }

  if (this.obj_alquiler.fo_auto == 0){ 
    this.validar_auto = false;
  }
  else{
    this.validar_auto = true;
  }

  if (this.obj_alquiler.fo_cliente == 0){ 
    this.validar_cliente = false;
  }
  else{
    this.validar_cliente = true;
  }

  if(this.validar_id_alquiler==true && this.validar_fecha==true && this.validar_duracion==true && this.validar_precio==true && this.validar_auto==true && this.validar_cliente && funcion=='guardar'){
    this.guardar();
  }
  if(this.validar_id_alquiler==true && this.validar_fecha==true && this.validar_duracion==true && this.validar_precio==true && this.validar_auto==true && this.validar_cliente && funcion=='editar'){
    this.editar();
  }
}


guardar(){
  this.salqui.insertar(this.obj_alquiler).subscribe((datos:any)=>{
    if(datos ['resultado']=='OK'){
      this.consulta();
      }
  });
  this.limpiar();
  this.mostrar_form('no ver');
}

eliminar(id:number){
  Swal.fire({
    title: "¿Estas seguro de eliminar el alquiler?",
    text: "¡El proceso no sera reversible!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Si Eliminar!",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      /////////////////////////
      this.salqui.eliminar(id).subscribe((datos:any)=>{
        if(datos['resultado']=="OK")
      
        this.consulta();
       });
      ////////////////////
      Swal.fire({
        title: "¡Eliminado!",
        text: "¡El alquiler ha sido eliminado!",
        icon: "success"
      });
    }
  });
  //console.log(id);


}

cargar_datos(items:any,id:number){
  this.obj_alquiler={
    id_alquiler:items.id_alquiler,
    fecha:items.fecha,
    duracion: items.duracion,
    precio:items.precio,
    fo_auto:items.fo_auto,
    fo_cliente:items.fo_cliente,
  };
  this.id_alquiler= id,
  this.botones_form=true,
  this.mostrar_form('mostrar');
}

editar(){
  this.salqui.editar(this.id_alquiler,this.obj_alquiler).subscribe((datos:any)=>{
    if(datos['resultado']=='OK'){
      this.consulta();
    }
  });
  this.limpiar();
  this.mostrar_form('no ver');
}

}
