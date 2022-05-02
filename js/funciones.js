import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js";

import { mascotaInput , propietarioInput, telefonoInput,
fechaInput, horaInput,sintomasInput,formulario} from "./selectores.js";


const ui = new UI();
const administrarCitas = new Citas();

let editando;

//objeto con informacion de la cita
const citaObj = {
    mascota: '',
    propietario:'',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas:''
}

//agrega datos al objeto de cita
export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
    
}


//valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e){
    e.preventDefault();

    //extraer informacion del objeto de cita
    const {mascota,propietario,telefono,fecha,hora,sintomas}=citaObj;

    //validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('todos los campos son obligatorios','error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('editado correctamente');

        //pasar el objeto de la cita a edicion
        administrarCitas.editarCita({...citaObj});
        
        //regresa el texto del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //quitar modo edicion
        editando = false;
    }else{

        //generar un id unico
        citaObj.id = Date.now();

        // creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        //mensaje que se agrego correctamente
        ui.imprimirAlerta('se agrego correctamente');
    }

    //reiniciar el objeto para la validacion
    reiniciarObjeto();

    //reinicia el formulario
    formulario.reset();
    
    //mostrar el html de las citas
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita (id){
    //eliminar la cita
    administrarCitas.eliminarCita(id);
    //muestre un mensaje
    ui.imprimirAlerta('la cita se elimino correctamente');
    //refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//cargar los datos y el modo edicion
export function cargarEdicion(cita){
    const {mascota,propietario,telefono,fecha,hora,sintomas,id}=cita;

    //llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    
    //lenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;


    //cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}

