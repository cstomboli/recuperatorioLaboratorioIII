namespace general
{
    export class Persona
    {
        public id:number;
        private nombre:string;
        private apellido:string;
        
        constructor(id:number, nombre:string, apellido:string)
        {
            this.id=id;
            this.nombre=nombre;
            this.apellido=apellido;
        }

        public getId():number
        {
            return this.id;
        }
        public setId(id:number):void
        {
            this.id=id;
        }

        public getnombre():string
        {
            return this.nombre;
        }
        public setnombre(nombre:string):void
        {
            this.nombre=nombre;
        }

        public getapellido():string
        {
            return this.apellido;
        }
        public setapellido(apellido:string):void
        {
            this.apellido=apellido;
        }

    }
}