var general;
(function (general) {
    var listaPersonas = new Array();
    var padre;
    var cabeceras = ["Id", "Nombre", "Apellido", "Edad", "Sexo"];
    window.onload = function () {
        var _a, _b, _c, _d, _e, _f;
        (_a = document.getElementById("btnAgregar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", agregar);
        (_b = document.getElementById("btnEliminar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", eliminar);
        (_c = document.getElementById("btnLimpiar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", limpiar);
        (_d = document.getElementById("btnPromedio")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", calcularPromedio);
        (_e = document.getElementById("txtSexo")) === null || _e === void 0 ? void 0 : _e.addEventListener("change", filtrarSexo);
        (_f = document.getElementById("cheqId")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", borarId);
        //document.getElementById("cheqNombre")?.addEventListener("click", borarNombre);
        //document.getElementById("cheqEdad")?.addEventListener("click", borarEdad);
        //document.getElementById("cheqApellido")?.addEventListener("click", borarApellido);
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
    function limpiar() {
        listaPersonas = new Array();
    }
    general.limpiar = limpiar;
    function Promesa() {
        return new Promise(function (resolve, reject) {
            var totalEdad = listaPersonas.reduce(function (total, num) {
                return total += num.getEdad();
            }, 0);
            resolve(totalEdad);
        });
    }
    general.Promesa = Promesa;
    function calcularPromedio() {
        Promesa().then(function (response) {
            document.getElementById("txtPromedio").value = (response / listaPersonas.length).toString();
        });
    }
    general.calcularPromedio = calcularPromedio;
    function PromesaSexo() {
        var sexo = document.getElementById("txtSexo").value;
        return new Promise(function (resolve, reject) {
            if (sexo == "Sexo") {
                reject(listaPersonas);
            }
            else {
                var listaFiltrada = listaPersonas.filter(function (persona) { return persona.getSexo() == sexo; });
                resolve(listaFiltrada);
            }
        });
    }
    general.PromesaSexo = PromesaSexo;
    function filtrarSexo() {
        document.getElementById("tabla").hidden = true;
        var nuevaTable = document.getElementById("tabla2");
        nuevaTable.hidden = false;
        PromesaSexo().then(function (response) {
            nuevaTable.innerHTML = "";
            var thead = document.createElement("thead");
            nuevaTable.appendChild(thead);
            for (var i = 0; i < cabeceras.length; i++) {
                thead.appendChild(document.createElement("th")).
                    appendChild(document.createTextNode(cabeceras[i]));
            }
            var listaPersonas = response;
            for (var i = 0; i < listaPersonas.length; i++) {
                cargarGrilla(nuevaTable, listaPersonas[i].getId(), listaPersonas[i].getnombre(), listaPersonas[i].getapellido(), listaPersonas[i].getEdad(), listaPersonas[i].getSexo().toString());
                console.log(listaPersonas[i]);
            }
            nuevaTable.hidden = false;
        })["catch"](function (reject) {
            nuevaTable.hidden = true;
            document.getElementById("tabla").hidden = false;
        });
    }
    general.filtrarSexo = filtrarSexo;
    function borarId() {
        var tabla = document.getElementById("tabla");
        var th = tabla.childNodes[1].childNodes[1].childNodes[1];
    }
    general.borarId = borarId;
})(general || (general = {}));
