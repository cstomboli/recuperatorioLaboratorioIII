var general;
(function (general) {
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
        }
        Persona.prototype.getId = function () {
            return this.id;
        };
        Persona.prototype.setId = function (id) {
            this.id = id;
        };
        Persona.prototype.getnombre = function () {
            return this.nombre;
        };
        Persona.prototype.setnombre = function (nombre) {
            this.nombre = nombre;
        };
        Persona.prototype.getapellido = function () {
            return this.apellido;
        };
        Persona.prototype.setapellido = function (apellido) {
            this.apellido = apellido;
        };
        return Persona;
    }());
    general.Persona = Persona;
})(general || (general = {}));
