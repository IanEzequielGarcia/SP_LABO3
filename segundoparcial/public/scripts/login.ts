/// <reference path="../node_modules/@types/jquery/index.d.ts" />

namespace Scaloneta
{
    const URL:string = "http://SPP/";
    export class Login
    {
        public static Login()
        {
            let correo = <string> $("#txtEmail").val();
            let clave  = <string> $("#txtContraseña").val();
            let dato:any = {};
            dato.correo = correo;
            dato.clave = clave;
            
            $.ajax({
                type: 'POST',
                url: URL+"login/",
                dataType: "json",
                data: {"user":JSON.stringify(dato)},
                async: true
            }
            )
            .done(function (resultado:any)
            {
                console.log(resultado);
                
                if(resultado.exito)
                {
                    window.location.replace(URL+"front-end-principal");
                }
                else
                {
                    if(resultado.status == 409)
                    {
                        $("#errorLogin").removeClass("hide");
                        $("#errorLogin").html("ERROR 409!!!! "+resultado.mensaje);
                    }else{
                        $("#errorLogin").removeClass("hide");
                        $("#errorLogin").html(resultado.mensaje);
                    }
                }
            })
            .fail(function (jqXHR:any, textStatus:any, errorThrown:any){
                let resultado = JSON.parse(jqXHR.responseText);
                if(resultado.status == 409)
                {
                    $("#errorLogin").removeClass("hide");
                    $("#errorLogin").html("ERROR 409!!!! "+resultado.mensaje);
                }else{
                    $("#errorLogin").removeClass("hide");
                    $("#errorLogin").html(resultado.mensaje);
                }
            });
        }

        //Esto lo puedo ahcer directamente asociando el location en el boton
        public static IrRegistro()
        {
            window.location.replace(URL+"front-end-registro");
        }
    }
}