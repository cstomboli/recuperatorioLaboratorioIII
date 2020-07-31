namespace general
{
    var listaPersonas:Array<Cliente> = new Array<Cliente>();
    var padre:any;
    window.onload = function()
    {
        document.getElementById("btnAgregar")?.addEventListener("click", agregar);
        document.getElementById("btnEliminar")?.addEventListener("click", eliminar);
        document.getElementById("btnLimpiar")?.addEventListener("click", limpiar);
        document.getElementById("btnPromedio")?.addEventListener("click", calcularPromedio);

        
        
        document.getElementById("btnMostrar")?.addEventListener("click",mostraRecuadro);
        document.getElementById("btnCerrar")?.addEventListener("click",cerrarRecuadro);
        document.getElementById("btnCerrarDos")?.addEventListener("click",cerrarRecuadro);
        document.getElementById("txtTipo")?.addEventListener("change", cantidadPuertas);

    }
    
    function obtenerId():number
    {
        var id=1;
        if(listaPersonas.length>0)
        {
            id = listaPersonas.reduce((persona, personaProximo)=> persona.id>personaProximo.id ? personaProximo = persona:personaProximo).id +1;
        }
        return id;
    }

    export function agregar()
    {
        var nombre:string= (<HTMLInputElement>document.getElementById("txtNombre")).value;
        var apellido:string=(<HTMLInputElement>document.getElementById("txtApellido")).value;
        var edad=parseInt((<HTMLInputElement>document.getElementById("txtEdad")).value);
        var sexo= (<HTMLSelectElement>document.getElementById("txtTipo")).value;
        var id =obtenerId();
                
        if(sexo == "Femenino" )// tipo == Auto)
        {           
            var nuevoCliente:Cliente = new Cliente(id, nombre, apellido, edad, general.Sexo.Femenino);
            listaPersonas.push(nuevoCliente);            
            //var container:any = document.getElementById("container");
            //container.hidden=true;
            cargarGrilla((<HTMLTableElement>document.getElementById("tabla")), id, nombre, apellido, edad, (general.Sexo.Femenino).toString());
        }
        else 
        {
            var nuevoCliente:Cliente = new Cliente(id, nombre, apellido, edad, general.Sexo.Masculino);
            listaPersonas.push(nuevoCliente);
            //var container:any = document.getElementById("container");
            //container.hidden=true;
            cargarGrilla((<HTMLTableElement>document.getElementById("tbody")), id, nombre, apellido, edad, (general.Sexo.Masculino).toString());
    
        }                
    }

    export function cargarGrilla(tabla: HTMLTableElement, id: number, nombre: string,
                                apellido: string, edad: number, sexo: string ): void 
    {
        //cuando cargo la grilla, agrego un button
        var tr= document.createElement("tr");
        
        var tdId= document.createElement("td");
        var txt=document.createTextNode(id.toString()); //nuevoAuto.GetId()
        tdId.appendChild(txt);
        tr.appendChild(tdId);
        //tdId.hidden=true;
       
        var tdNa= document.createElement("td");
        var txt=document.createTextNode(nombre);
        tdNa.appendChild(txt);
        tr.appendChild(tdNa);

        var tdAp= document.createElement("td");
        var txt=document.createTextNode(apellido);
        tdAp.appendChild(txt);
        tr.appendChild(tdAp);

        var tdPre= document.createElement("td");
        var txt=document.createTextNode(edad.toString());
        tdPre.appendChild(txt);
        tr.appendChild(tdPre);

        
        var tdPue= document.createElement("td");
        var txt=document.createTextNode(sexo);
        tdPue.appendChild(txt);
        tr.appendChild(tdPue);      
        
        tr.addEventListener('click', mostrar);
        tabla.appendChild(tr);  
    }

    export function mostrar(e:any)
    {
        padre= e.target.parentNode;
        var hijo= padre.childNodes;
        console.log(padre);
        (<HTMLInputElement>document.getElementById("txtId")).value= hijo[0].textContent;
        (<HTMLInputElement>document.getElementById("txtNombre")).value= hijo[1].textContent;
        (<HTMLInputElement>document.getElementById("txtApellido")).value= hijo[2].textContent;
        (<HTMLInputElement>document.getElementById("txtEdad")).value= hijo[3].textContent;
        (<HTMLInputElement>document.getElementById("txtTipo")).value= hijo[4].textContent;  
    }

    export function eliminar()
    {
        var trAborrar = padre;
        var tdBorrado  = trAborrar.childNodes[0].innerHTML;
        var listaId = listaPersonas.filter(Vehiculo => Vehiculo.getId()== tdBorrado);
        if(listaId.length>0)
        {
            listaPersonas.splice(tdBorrado,1);
            padre.remove();
        }
    }

    export function limpiar()
    {
        listaPersonas = new Array<Cliente>();
    }

    export function Promesa()
    {
        return new Promise((resolve, reject)=>{

            let totalEdad = listaPersonas.reduce(function(total,num){ 
            return total += num.getEdad()},0);
            resolve(totalEdad);              
                  
          });        
    }

    export function calcularPromedio()
    {
        Promesa().then((response)=>{
            (<HTMLInputElement>document.getElementById("txtPromedio")).value = (response/listaPersonas.length).toString();
             
        });
    }


}