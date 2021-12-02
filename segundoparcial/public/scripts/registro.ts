/// <reference path="../node_modules/@types/jquery/index.d.ts" />

namespace Scaloneta{
    const URL:string = "http://SPP/";
    export class Registro
    {
        public static AltaUsuario()
        {
            let correo = <string> $("#txtCorreo").val();
            let clave = <string> $("#txtContraseña").val();
            let nombre = <string> $("#txtNombre").val();
            let apellido = <string> $("#txtApellido").val();
            let perfil = <string> $("#txtPerfil").val();
            let foto:any = (<HTMLInputElement>document.getElementById("foto")).files;

            let form = new FormData();

            form.append("foto", foto[0]);

            let dato:any = {}; 
            dato.correo = correo;
            dato.clave = clave;
            dato.nombre = nombre;
            dato.apellido = apellido;
            dato.perfil = perfil;

            form.append("usuario", JSON.stringify(dato));

            $.ajax({
                type: 'POST',
                url: URL+"usuarios/",
                dataType: "json",
                contentType: false,
                processData: false,
                data: form,
                async: true
            }
            )
            .done(function (resultado:any){
                console.log(resultado);
                
                if(resultado.exito)
                {
                    window.location.replace(URL+"front-end-login");
                }
            })
            .fail(function (jqXHR:any, textStatus:any, errorThrown:any){
                console.log(jqXHR.responseText);
                let resultado = JSON.parse(jqXHR.responseText);
                console.log(resultado);
                
                if(!resultado.exito)
                {
                    $("#errorReg").removeClass("hide");
                    $("#errorReg").html(resultado.mensaje);
                }
            });
        }

        
    }
}