/// <reference path="../node_modules/@types/jquery/index.d.ts" />
var Scaloneta;
(function (Scaloneta) {
    var URL = "http://SPP/";
    var Registro = /** @class */ (function () {
        function Registro() {
        }
        Registro.AltaUsuario = function () {
            var correo = $("#txtCorreo").val();
            var clave = $("#txtContraseña").val();
            var nombre = $("#txtNombre").val();
            var apellido = $("#txtApellido").val();
            var perfil = $("#txtPerfil").val();
            var foto = document.getElementById("foto").files;
            var form = new FormData();
            form.append("foto", foto[0]);
            var dato = {};
            dato.correo = correo;
            dato.clave = clave;
            dato.nombre = nombre;
            dato.apellido = apellido;
            dato.perfil = perfil;
            form.append("usuario", JSON.stringify(dato));
            $.ajax({
                type: 'POST',
                url: URL + "usuarios/",
                dataType: "json",
                contentType: false,
                processData: false,
                data: form,
                async: true
            })
                .done(function (resultado) {
                console.log(resultado);
                if (resultado.exito) {
                    window.location.replace(URL + "front-end-login");
                }
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                var resultado = JSON.parse(jqXHR.responseText);
                console.log(resultado);
                if (!resultado.exito) {
                    $("#errorReg").removeClass("hide");
                    $("#errorReg").html(resultado.mensaje);
                }
            });
        };
        return Registro;
    }());
    Scaloneta.Registro = Registro;
})(Scaloneta || (Scaloneta = {}));
