var general;
(function (general) {
    var listaVehiculos = new Array();
    window.onload = function () {
        var _a, _b, _c, _d, _e;
        (_a = document.getElementById("btnMostrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", mostraRecuadro);
        (_b = document.getElementById("btnCerrar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", cerrarRecuadro);
        (_c = document.getElementById("btnCerrarDos")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", cerrarRecuadro);
        (_d = document.getElementById("txtTipo")) === null || _d === void 0 ? void 0 : _d.addEventListener("change", cantidadPuertas);
        (_e = document.getElementById("btnAgregar")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", agregar);
    };
    function cantidadPuertas() {
        var tipoAuto = document.getElementById("txtTipo").value;
        if (tipoAuto == "Auto") {
            document.getElementById("auto").hidden = false;
            document.getElementById("camioneta").hidden = true;
        }
        else {
            document.getElementById("camioneta").hidden = false;
            document.getElementById("auto").hidden = true;
        }
    }
    general.cantidadPuertas = cantidadPuertas;
    function cerrarRecuadro() {
        var container = document.getElementById("container");
        container.hidden = true;
    }
    general.cerrarRecuadro = cerrarRecuadro;
    function mostraRecuadro() {
        var container = document.getElementById("container");
        container.hidden = false;
    }
    general.mostraRecuadro = mostraRecuadro;
    function obtenerId() {
        var id = 1;
        if (listaVehiculos.length > 0) {
            id = listaVehiculos.reduce(function (vehiculo, vehiculoProximo) { return vehiculo.id > vehiculoProximo.id ? vehiculoProximo = vehiculo : vehiculoProximo; }).id + 1;
        }
        return id;
    }
    function agregar() {
        var marca = document.getElementById("txtMarca").value;
        var modelo = document.getElementById("txtModelo").value;
        var precio = parseInt(document.getElementById("txtPrecio").value);
        var tipo = document.getElementById("txtTipo").value;
        var id = obtenerId();
        if (tipo == "Auto") // tipo == Auto)
         {
            var cantidadPuertas = parseInt(document.getElementById("puertas").value);
            var nuevoAuto = new Auto(id, marca, modelo, precio, cantidadPuertas);
            listaVehiculos.push(nuevoAuto);
            var container = document.getElementById("container");
            container.hidden = true;
            cargarGrilla(document.getElementById("tabla"), id, marca, modelo, precio, cantidadPuertas, false);
        }
        else {
            var cuatroXcuatro = document.getElementById("cuatroXcuatro").checked;
            var nuevaCamio = new Camioneta(obtenerId(), marca, modelo, precio, cuatroXcuatro);
            listaVehiculos.push(nuevaCamio);
            var container = document.getElementById("container");
            container.hidden = true;
            cargarGrilla(document.getElementById("tbody"), id, marca, modelo, precio, 0, true);
        }
    }
    general.agregar = agregar;
    function cargarGrilla(tabla, id, marca, modelo, precio, cantPuert, esCuatroXcuatro) {
        //cuando cargo la grilla, agrego un button
        var tr = document.createElement("tr");
        var tdId = document.createElement("td");
        var txt = document.createTextNode(id.toString()); //nuevoAuto.GetId()
        tdId.appendChild(txt);
        tr.appendChild(tdId);
        //tdId.hidden=true;
        var tdNa = document.createElement("td");
        var txt = document.createTextNode(marca);
        tdNa.appendChild(txt);
        tr.appendChild(tdNa);
        var tdAp = document.createElement("td");
        var txt = document.createTextNode(modelo);
        tdAp.appendChild(txt);
        tr.appendChild(tdAp);
        var tdPre = document.createElement("td");
        var txt = document.createTextNode(precio.toString());
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
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener('click', general.eliminar); //Vehiculo.eliminar ver esto       
        tdElim.appendChild(btnEliminar);
        tr.appendChild(tdElim);
        tabla.appendChild(tr);
    }
    general.cargarGrilla = cargarGrilla;
    function eliminar(tr) {
        alert("aprete");
        var trAborrar = tr.target.parentNode.parentNode;
        var tdBorrado = trAborrar.childNodes[0].innerHTML;
        var listaId = listaVehiculos.filter(function (Vehiculo) { return Vehiculo.getId() == tdBorrado; });
        if (listaId.length > 0) {
            listaVehiculos.splice(tdBorrado, 1);
            tr.target.parentNode.parentNode.remove();
        }
    }
    general.eliminar = eliminar;
})(general || (general = {}));
