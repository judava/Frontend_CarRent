import { Component } from '@angular/core';
import { AutoService } from '../../servicios/auto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrl: './vehiculo.component.scss'
})
export class VehiculoComponent {
  auto:any;
  id_auto:any;

  obj_auto={
    id_auto:0,
    marca:"",
    modelo:0,
    numero_placa:"",
    caracteristicas:"",
    disponibilidad:0,
    tiempo_alquiler:"",
    precio:0,
    
};
   
   validar_id_auto=true;
   validar_marca=true;
   validar_modelo=true;
   validar_numero_placa=true;
   validar_caracteristicas=true;
   validar_disponibilidad=true;
   validar_tiempo_alquiler=true;
   validar_precio=true;
   dform= false;
   botones_form= false;


  constructor(private sauto:AutoService) {}
 
  ngOnInit() : void{
 this.consulta();
  }
 
  consulta(){
   this.sauto.consultar().subscribe((resultado:any)=>{
     this.auto = resultado;
   })
  }
  descartar_form(dato:any){
    switch(dato){
      case 'descartar':
        this.dform = true;
        break;
      case 'no descartar':
        this.dform = false;
        this.botones_form=false;
        break;
    }
  }

limpiar(){
  this.obj_auto={
    id_auto:0,
    marca:"",
    modelo:0,
    numero_placa:"",
    caracteristicas:"",
    disponibilidad:0,
    tiempo_alquiler:"",
    precio:0,
  };
}

  validar4(funcion:any){
    if (this.obj_auto.id_auto == 0){ 
      this.validar_id_auto = false;
    }
    else{
      this.validar_id_auto = true;
    }
    if (this.obj_auto.marca == ''){ 
      this.validar_marca = false;
    }
    else{
      this.validar_marca = true;
    }
    if (this.obj_auto.modelo == 0){ 
      this.validar_modelo = false;
    }
    else{
      this.validar_modelo = true;
    }
    if (this.obj_auto.numero_placa == ''){ 
      this.validar_numero_placa = false;
    }
    else{
      this.validar_numero_placa = true;
    }
    if (this.obj_auto.caracteristicas == ''){ 
      this.validar_caracteristicas = false;
    }
    else{
      this.validar_caracteristicas = true;
    }
    if (this.obj_auto.disponibilidad == 0){ 
      this.validar_disponibilidad = false;
    }
    else{
      this.validar_disponibilidad = true;
    }
    if (this.obj_auto.tiempo_alquiler == ''){ 
      this.validar_tiempo_alquiler = false;
    }
    else{
      this.validar_tiempo_alquiler = true;
    }
    if (this.obj_auto.precio == 0){ 
      this.validar_precio = false;
    }
    else{
      this.validar_precio = true;
    }

    if(this.validar_id_auto==true && this.validar_marca==true && this.validar_modelo==true && this.validar_numero_placa==true && this.validar_caracteristicas==true && this.validar_disponibilidad==true && this.validar_tiempo_alquiler==true && this.validar_precio && funcion=='guardar'){
      this.guardar();
    }
    if(this.validar_id_auto==true && this.validar_marca==true && this.validar_modelo==true && this.validar_numero_placa==true && this.validar_caracteristicas==true && this.validar_disponibilidad==true && this.validar_tiempo_alquiler==true && this.validar_precio && funcion=='editar'){
      this.editar();
    }
  }

  guardar(){
    this.sauto.insertar(this.obj_auto).subscribe((datos:any)=>{
      if(datos ['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.descartar_form('no ver');
  }

  eliminar(id:number){
    Swal.fire({
      title: "¿Estas seguro de eliminar el auto?",
      text: "¡El proceso no sera reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si Eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        ////////////////////
        this.sauto.eliminar(id).subscribe((datos:any)=>{
          if(datos['resultado']=="OK")
        
          this.consulta();
         });
        ///////////////////
        Swal.fire({
          title: "¡Eliminado!",
          text: "¡El auto ha sido eliminado!",
          icon: "success"
        });
      }
    });
    

    //console.log(id);
    
    }

  cargar_datos(items:any , id:number){
    this.obj_auto={
      id_auto: items.id_auto,
      marca: items.marca,
      modelo: items.modelo,
      numero_placa: items.numero_placa,
      caracteristicas: items.caracteristicas,
      disponibilidad: items.disponibilidad,
      tiempo_alquiler: items.tiempo_alquiler,
      precio: items.precio,
    };
    this.id_auto=id;
    this.botones_form=true;
    this.descartar_form('descartar')
    }

    editar(){
      this.sauto.editar(this.id_auto, this.obj_auto).subscribe((datos:any)=>{
        if(datos['resultado']=='OK'){
          this.consulta();
        }
      });
      this.limpiar();
      this.descartar_form('no descartar');
    }
  }

