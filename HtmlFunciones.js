var general;
(function (general) {
    var listaPersonas = new Array();
    var padre;
    window.onload = function () {
        var _a, _b, _c, _d, _e, _f;
        (_a = document.getElementById("btnAgregar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", agregar);
        (_b = document.getElementById("btnEliminar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", eliminar);
        (_c = document.getElementById("btnMostrar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", mostraRecuadro);
        (_d = document.getElementById("btnCerrar")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", cerrarRecuadro);
        (_e = document.getElementById("btnCerrarDos")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", cerrarRecuadro);
        (_f = document.getElementById("txtTipo")) === null || _f === void 0 ? void 0 : _f.addEventListener("change", cantidadPuertas);
    };
    function obtenerId() {
        var id = 1;
        if (listaPersonas.length > 0) {
            id = listaPersonas.reduce(function (persona, personaProximo) { return persona.id > personaProximo.id ? personaProximo = persona : personaProximo; }).id + 1;
        }
        return id;
    }
    function agregar() {
        var nombre = document.getElementById("txtNombre").value;
        var apellido = document.getElementById("txtApellido").value;
        var edad = parseInt(document.getElementById("txtEdad").value);
        var sexo = document.getElementById("txtTipo").value;
        var id = obtenerId();
        if (sexo == "Femenino") // tipo == Auto)
         {
            var nuevoCliente = new general.Cliente(id, nombre, apellido, edad, general.Sexo.Femenino);
            listaPersonas.push(nuevoCliente);
            //var container:any = document.getElementById("container");
            //container.hidden=true;
            cargarGrilla(document.getElementById("tabla"), id, nombre, apellido, edad, (general.Sexo.Femenino).toString());
        }
        else {
            var nuevoCliente = new general.Cliente(id, nombre, apellido, edad, general.Sexo.Masculino);
            listaPersonas.push(nuevoCliente);
            //var container:any = document.getElementById("container");
            //container.hidden=true;
            cargarGrilla(document.getElementById("tbody"), id, nombre, apellido, edad, (general.Sexo.Masculino).toString());
        }
    }
    general.agregar = agregar;
    function cargarGrilla(tabla, id, nombre, apellido, edad, sexo) {
        //cuando cargo la grilla, agrego un button
        var tr = document.createElement("tr");
        var tdId = document.createElement("td");
        var txt = document.createTextNode(id.toString()); //nuevoAuto.GetId()
        tdId.appendChild(txt);
        tr.appendChild(tdId);
        //tdId.hidden=true;
        var tdNa = document.createElement("td");
        var txt = document.createTextNode(nombre);
        tdNa.appendChild(txt);
        tr.appendChild(tdNa);
        var tdAp = document.createElement("td");
        var txt = document.createTextNode(apellido);
        tdAp.appendChild(txt);
        tr.appendChild(tdAp);
        var tdPre = document.createElement("td");
        var txt = document.createTextNode(edad.toString());
        tdPre.appendChild(txt);
        tr.appendChild(tdPre);
        var tdPue = document.createElement("td");
        var txt = document.createTextNode(sexo);
        tdPue.appendChild(txt);
        tr.appendChild(tdPue);
        tr.addEventListener('click', mostrar);
        tabla.appendChild(tr);
    }
    general.cargarGrilla = cargarGrilla;
    function mostrar(e) {
        padre = e.target.parentNode;
        var hijo = padre.childNodes;
        console.log(padre);
        document.getElementById("txtId").value = hijo[0].textContent;
        document.getElementById("txtNombre").value = hijo[1].textContent;
        document.getElementById("txtApellido").value = hijo[2].textContent;
        document.getElementById("txtEdad").value = hijo[3].textContent;
        document.getElementById("txtTipo").value = hijo[4].textContent;
    }
    general.mostrar = mostrar;
    function eliminar() {
        var trAborrar = padre;
        var tdBorrado = trAborrar.childNodes[0].innerHTML;
        var listaId = listaPersonas.filter(function (Vehiculo) { return Vehiculo.getId() == tdBorrado; });
        if (listaId.length > 0) {
            listaPersonas.splice(tdBorrado, 1);
            padre.remove();
        }
    }
    general.eliminar = eliminar;
})(general || (general = {}));
