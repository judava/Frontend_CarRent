import { Component } from '@angular/core';
import { ReservaService } from '../../servicios/reserva.service';
import { AutoService } from '../../servicios/auto.service';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.scss'
})
export class PagoComponent {
  pago:any;
  auto2: any;
  cliente2: any;
  id_reserva: any;

  obj_reserva={
    id_reserva:0,
    fecha:'',
    duracion:'',
    precio:0,
    fo_auto:0,
    fo_cliente:0
 };
  
  validar_id_reserva= true;
  validar_fecha= true;
  validar_duracion= true;
  validar_precio= true;
  validar_auto= true;
  validar_cliente= true;
  rform= false;
  botones_form= false;
 

  
  constructor(private spago:ReservaService,private sauto2:AutoService, private scliente2:ClienteService) {}
 
  ngOnInit() : void{
 this.consulta();
 this.consulta_a2();
 this.consulta_c2();
  }
 
  consulta(){
   this.spago.consultar().subscribe((resultado:any)=>{
     this.pago = resultado;
   })
  }
  consulta_a2(){
    this.sauto2.consultar().subscribe((resultado:any)=>{
      this.auto2 = resultado;
    })
   }
   consulta_c2(){
    this.scliente2.consultar().subscribe((resultado:any)=>{
      this.cliente2 = resultado;
    })
   }

  revelar_form(dato:any){
    switch(dato){
      case 'revelar':
      this.rform = true;
      break;
      case 'no revelar':
      this.rform = false;
      this.botones_form=false;
      break;
    }
  }

  limpiar(){
    this.obj_reserva={
      id_reserva:0,
      fecha:'',
      duracion:'',
      precio:0,
      fo_auto:0,
      fo_cliente:0
    };
  }

  validar3(funcion:any){
    if (this.obj_reserva.id_reserva == 0){ 
      this.validar_id_reserva = false;
    }
    else{
      this.validar_id_reserva = true;
    }

    if (this.obj_reserva.fecha == ''){ 
      this.validar_fecha = false;
    }
    else{
      this.validar_fecha = true;
    }

    if (this.obj_reserva.duracion == ''){ 
      this.validar_duracion = false;
    }
    else{
      this.validar_duracion = true;
    }

    if (this.obj_reserva.precio == 0){ 
      this.validar_precio = false;
    }
    else{
      this.validar_precio = true;
    }

    if (this.obj_reserva.fo_auto == 0){ 
      this.validar_auto = false;
    }
    else{
      this.validar_auto = true;
    }

    if (this.obj_reserva.fo_cliente == 0){ 
      this.validar_cliente = false;
    }
    else{
      this.validar_cliente = true;
    }

    if(this.validar_id_reserva==true && this.validar_fecha==true && this.validar_duracion==true && this.validar_precio==true && this.validar_auto==true && this.validar_cliente && funcion=='guardar'){
      this.guardar();
    }
    if(this.validar_id_reserva==true && this.validar_fecha==true && this.validar_duracion==true && this.validar_precio==true && this.validar_auto==true && this.validar_cliente && funcion=='editar'){
      this.editar();
    }
  }

  guardar(){
    this.spago.insertar(this.obj_reserva).subscribe((datos:any)=>{
      if(datos ['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.revelar_form('no ver');
  }
  eliminar(id:number){
    Swal.fire({
      title: "¿Estas seguro de eliminar la reserva?",
      text: "¡El proceso no sera reversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si Eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        //////////////
        this.spago.eliminar(id).subscribe((datos:any)=>{
          if(datos['resultado']=="OK")
        
          this.consulta();
         });
        /////////////
        Swal.fire({
          title: "¡Eliminado!",
          text: "¡La reserva ha sido eliminado!",
          icon: "success"
        });
      }
    });
    
    
    //console.log(id);
   
    }

  cargar_datos(items:any , id:number){
    this.obj_reserva={
      id_reserva: items.id_reserva,
      fecha:items.fecha,
      duracion: items.duracion,
      precio: items.precio,
      fo_auto: items.fo_auto,
      fo_cliente: items.fo_cliente, 
    };
    this.id_reserva =id;
    this.botones_form=true;
    this.revelar_form('revelar')
    }

    editar(){
      this.spago.editar(this.id_reserva,this.obj_reserva).subscribe((datos:any)=>{
        if(datos ['resultado']=='OK'){
          this.consulta();
          }
      });
      this.limpiar();
      this.revelar_form('no ver');
    }
}
