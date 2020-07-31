namespace general
{
    var listaVehiculos:Array<Vehiculo> = new Array<Vehiculo>();

    window.onload = function()
    {
        document.getElementById("btnMostrar")?.addEventListener("click",mostraRecuadro);
        document.getElementById("btnCerrar")?.addEventListener("click",cerrarRecuadro);
        document.getElementById("btnCerrarDos")?.addEventListener("click",cerrarRecuadro);
        document.getElementById("txtTipo")?.addEventListener("change", cantidadPuertas);
        document.getElementById("btnAgregar")?.addEventListener("click", agregar);

    }

    export function cantidadPuertas()
    {
        var tipoAuto:any = (<HTMLInputElement>document.getElementById("txtTipo")).value;

        if(tipoAuto== "Auto")
        {
            (<HTMLInputElement>document.getElementById("auto")).hidden=false;
            (<HTMLInputElement>document.getElementById("camioneta")).hidden=true;
        }
        else
        {
            (<HTMLInputElement>document.getElementById("camioneta")).hidden=false;
            (<HTMLInputElement>document.getElementById("auto")).hidden=true;
  
        }      
    }

    export function cerrarRecuadro()
    {
        var container:any = document.getElementById("container");
        container.hidden=true;
    }

    export function mostraRecuadro()
    {
        var container:any = document.getElementById("container");
        container.hidden=false;
    }
    
    function obtenerId():number
    {
        var id=1;
        if(listaVehiculos.length>0)
        {
            id = listaVehiculos.reduce((vehiculo, vehiculoProximo)=> vehiculo.id>vehiculoProximo.id ? vehiculoProximo = vehiculo:vehiculoProximo).id +1;
        }
        return id;
    }

    export function agregar()
    {
        var marca:string= (<HTMLInputElement>document.getElementById("txtMarca")).value;
        var modelo:string=(<HTMLInputElement>document.getElementById("txtModelo")).value;
        var precio=parseInt((<HTMLInputElement>document.getElementById("txtPrecio")).value);
        var tipo= (<HTMLInputElement>document.getElementById("txtTipo")).value;
        var id =obtenerId();
                
        if(tipo == "Auto" )// tipo == Auto)
        {
            var cantidadPuertas:number = parseInt((<HTMLInputElement>document.getElementById("puertas")).value);
            
            var nuevoAuto:Auto = new Auto(id, marca, modelo, precio, cantidadPuertas);
            listaVehiculos.push(nuevoAuto);            
            var container:any = document.getElementById("container");
            container.hidden=true;
            cargarGrilla((<HTMLTableElement>document.getElementById("tabla")), id, marca, modelo, precio, cantidadPuertas, false);
        }
        else 
        {
            var cuatroXcuatro:boolean = (<HTMLInputElement>document.getElementById("cuatroXcuatro")).checked;
            var nuevaCamio:Camioneta = new Camioneta(obtenerId(), marca, modelo, precio, cuatroXcuatro);
            listaVehiculos.push(nuevaCamio);
            var container:any = document.getElementById("container");
            container.hidden=true;
            cargarGrilla((<HTMLTableElement>document.getElementById("tbody")), id, marca, modelo, precio, 0, true);
    
        }                
    }

    export function cargarGrilla(tabla: HTMLTableElement, id: number, marca: string,
                                modelo: string, precio: number, cantPuert: number, 
                                esCuatroXcuatro: boolean): void 
    {
        //cuando cargo la grilla, agrego un button
        var tr= document.createElement("tr");
        
        var tdId= document.createElement("td");
        var txt=document.createTextNode(id.toString()); //nuevoAuto.GetId()
        tdId.appendChild(txt);
        tr.appendChild(tdId);
        //tdId.hidden=true;
       
        var tdNa= document.createElement("td");
        var txt=document.createTextNode(marca);
        tdNa.appendChild(txt);
        tr.appendChild(tdNa);

        var tdAp= document.createElement("td");
        var txt=document.createTextNode(modelo);
        tdAp.appendChild(txt);
        tr.appendChild(tdAp);

        var tdPre= document.createElement("td");
        var txt=document.createTextNode(precio.toString());
        tdPre.appendChild(txt);
        tr.appendChild(tdPre);

        /*
        var tdPue= document.createElement("td");
        var txt=document.createTextNode(cantPuert.toString());
        tdPue.appendChild(txt);
        tr.appendChild(tdPue);

        var tdCua= document.createElement("td");
        var txt=document.createTextNode(esCuatroXcuatro.toString());
        tdCua.appendChild(txt);
        tr.appendChild(tdCua);
        */
        var tdElim = document.createElement("td");
        var btnEliminar = document.createElement("button"); 
        btnEliminar.textContent="Eliminar";
        btnEliminar.addEventListener('click',general.eliminar); //Vehiculo.eliminar ver esto       
        tdElim.appendChild(btnEliminar);              
        tr.appendChild(tdElim);

        tabla.appendChild(tr);  
    }

    export function eliminar(tr: any)
    {
        alert("aprete");
        var trAborrar = tr.target.parentNode.parentNode;
        var tdBorrado  = trAborrar.childNodes[0].innerHTML;
        var listaId = listaVehiculos.filter(Vehiculo => Vehiculo.getId()== tdBorrado);
        if(listaId.length>0)
        {
            listaVehiculos.splice(tdBorrado,1);
            tr.target.parentNode.parentNode.remove();
        }
    }
}