/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var Scaloneta;
(function (Scaloneta) {
    var URL = "http://SPP/";
    var Login = /** @class */ (function () {
        function Login() {
        }
        Login.Login = function () {
            var correo = $("#txtEmail").val();
            var clave = $("#txtContraseña").val();
            var dato = {};
            dato.correo = correo;
            dato.clave = clave;
            $.ajax({
                type: 'POST',
                url: URL + "login/",
                dataType: "json",
                data: { "user": JSON.stringify(dato) },
                async: true
            })
                .done(function (resultado) {
                console.log(resultado);
                if (resultado.exito) {
                    window.location.replace(URL + "front-end-principal");
                }
                else {
                    if (resultado.status == 409) {
                        $("#errorLogin").removeClass("hide");
                        $("#errorLogin").html("ERROR 409!!!! " + resultado.mensaje);
                    }
                    else {
                        $("#errorLogin").removeClass("hide");
                        $("#errorLogin").html(resultado.mensaje);
                    }
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                var resultado = JSON.parse(jqXHR.responseText);
                if (resultado.status == 409) {
                    $("#errorLogin").removeClass("hide");
                    $("#errorLogin").html("ERROR 409!!!! " + resultado.mensaje);
                }
                else {
                    $("#errorLogin").removeClass("hide");
                    $("#errorLogin").html(resultado.mensaje);
                }
            });
        };
        //Esto lo puedo ahcer directamente asociando el location en el boton
        Login.IrRegistro = function () {
            window.location.replace(URL + "front-end-registro");
        };
        return Login;
    }());
    Scaloneta.Login = Login;
})(Scaloneta || (Scaloneta = {}));
