    /// <reference path="../node_modules/@types/jquery/index.d.ts" />
    namespace Scaloneta
    {
        const URL:string = "http://SPP/";

        export class Principal
        {
            public static LimpiarDivs()
            {
                $("#error").html("");
                $("#warning").html("");
                $("#exito").html("");
                $("#info").html("");

                $("#error").addClass("hide");
                $("#warning").addClass("hide");
                $("#exito").addClass("hide");
                $("#info").addClass("hide");
            }
            public static MostrarUsuarios()
            {
                //Scaloneta.Principal.LimpiarDivs();
                
                $.ajax({
                    type: 'GET',
                    url: URL,
                    
                    async: true
                }
                )
                .done(function (resultado:any){
                    console.log(resultado);
                    
                    if(resultado.exito)
                    {
                        let tabla = Scaloneta.Principal.ArmarListaUsuarios(resultado.dato);
                        $("#divUsuarios").html(tabla);
                    }

                })
                .fail(function (jqXHR:any, textStatus:any, errorThrown:any){
                    let resultado = JSON.parse(jqXHR.responseText);
                    console.log(resultado);
                    
                    if(!resultado.exito)
                    {
                        if(resultado.status == 403)
                        {
                            window.location.replace(URL+"front-end-login");
                        }
                        $("#error").removeClass("hide");
                        $("#error").html(resultado.mensaje);
                    }
                    
                });
            }

            public static ArmarListaUsuarios(lista:any)
            {
                let dato = JSON.parse(lista);

                let tabla:string = '<table class="table table-hover table-sucess">';
                tabla += '<thead class="thead-sucess"><tr><th>Correo</th><th>Nombre</th><th>Apellido</th><th>Perfil</th><th>Foto</th></tr></thead>';

                if(lista === false)
                {
                    tabla = '<tr><td>---</td><td>---</td><td>---</td><td>---</td><th>---</td></tr>';
                    $('#error').removeClass("hide");
                        let aux;
                        aux=document.getElementById("error");
                        if(aux!=null)
                            aux.innerHTML = "No se puedo acceder a la tabla de usuarios!"+'<button type="button" class="close" onclick="Scaloneta.Principal.LimpiarDivs()">&times;</button>';
                }
                else
                {

                    for(let i = 0; i < dato.length; i++)
                    {
                        tabla += "<tr><td>"+dato[i].correo+"</td><td>"+dato[i].nombre+"</td><td>"+dato[i].apellido+"</td><td>"+dato[i].perfil+"</td>"+
                        "<td>";
                        if(dato[i].foto!=="null")
                        {
                            tabla+="<img style='width: 50px; height: 50px;' src='."+dato[i].foto+"'>";
                        }
                        else
                        {
                            tabla+="sin foto";
                        }
                        tabla +="<td>"+"<button class='btn btn-danger' onclick="+'Scaloneta.Principal.EliminarUsuario('+JSON.stringify(dato[i])+')'+
                        ">Borrar</button></td>"+"<td><button class='btn btn-info' onclick="+'Scaloneta.Principal.ModificarUsuario('+ JSON.stringify(dato[i]) +')'+'>Modificar</button>'+"</td></tr>";
                        tabla+="</td></tr>";
                    }
                }

                tabla += "</table>";

                return tabla;
            }

            public static MostrarAutos()
            {
                $.ajax({
                    type: 'GET',
                    url: URL+"autos/",
                
                    async: true
                }
                )
                .done(function (resultado:any){
                    console.log(resultado);
                    
                    if(resultado.éxito)
                    {
                        let tabla = Scaloneta.Principal.ArmarListaAutos(resultado.dato);
                        $("#divAutos").html(tabla);
                    }
                })
                .fail(function (jqXHR:any, textStatus:any, errorThrown:any){
                    let resultado = JSON.parse(jqXHR.responseText);
                    console.log(resultado);
                    
                    if(!resultado.exito)
                    {
                        if(resultado.status == 403)
                        {
                            window.location.replace(URL+"front-end-login");
                        }
                        $("#error").removeClass("hide");
                        $("#error").html(resultado.mensaje);
                    }
                    
                });
            }

            public static ArmarListaAutos(lista:any)
            {
                let dato = JSON.parse(lista);

                let tabla:string = '<table class="table table-hover table-sucess">';
                tabla += '<thead class="thead-success"><tr><th>Color</th><th>Marca</th><th>Precio</th><th>Modelo</th><th>Eliminar</th><th>Modificar</th></tr></thead>';

                if(lista === false)
                {
                    tabla += '<tr><td>---</td><td>---</td><td>---</td><td>---</td></tr>';
                    $('#error').removeClass("hide");
                        let aux;
                        aux=document.getElementById("error");
                        if(aux!=null)
                            aux.innerHTML = "No se puedo acceder a la tabla de autos!"+'<button type="button" class="close" onclick="Scaloneta.Principal.LimpiarDivs()">&times;</button>';
                }
                else
                {
                    for(let i = 0; i < dato.length; i++)
                    {
                        tabla += "<tr><td>"+dato[i].color+"</td><td>"+dato[i].marca+"</td><td>"+dato[i].precio+"</td><td>"+dato[i].modelo+"</td>"+
                        "<td>"+"<button class='btn btn-danger' onclick="+'Scaloneta.Principal.EliminarAuto('+JSON.stringify(dato[i])+')'+">Borrar</button></td>"+"<td><button class='btn btn-info' onclick="+'Scaloneta.Principal.ModificarAuto('+ JSON.stringify(dato[i]) +')'+'>Modificar</button>'+"</td></tr>";
                    }
                }

                tabla += "</table>";

                return tabla;
            }

            public static CrearForm(metodo:any)
            {
                Scaloneta.Principal.LimpiarDivs();
                let form:any='<form action="" id="loginForm" method="post" class="well form-horizontal col-md-6" style="background-color:darkcyan; margin-left:125px;margin-top:25px">'+

                '<div class="form-group">'+
                    '<div class="col-md-12 inputGroupContainer">'+
                        '<div class="input-group">'+
                            '<span class="input-group-addon"><i class="fas fa-trademark"></i></span>'+
                            '<input type="text" name="marca" id="marca" class="form-control" placeholder="Mrca">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            
                '<div class="form-group">'+
                    '<div class="col-md-12 inputGroupContainer">'+
                        '<div class="input-group">'+
                            '<span class="input-group-addon"><i class="fas fa-palette"></i></span>'+
                            '<input type="text" name="color" id="color" class="form-control" placeholder="Color">'+
                        '</div>'+
                    '</div>'+
                '</div>'+

                '<div class="form-group">'+
                    '<div class="col-md-12 inputGroupContainer">'+
                        '<div class="input-group">'+
                            '<span class="input-group-addon"><i class="fas fa-car"></i></span>'+
                            '<input type="text" name="modelo" id="modelo" class="form-control" placeholder="Modelo">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            
                '<div class="form-group">'+
                    '<div class="col-md-12 inputGroupContainer">'+
                        '<div class="input-group">'+
                            '<span class="input-group-addon"><i class="fas fa-dollar-sign"></i></span>'+
                            '<input type="text" name="precio" id="precio" class="form-control" placeholder="Precio">'+
                        '</div>'+
                    '</div>'+
                '</div>';
            
                if(metodo == "Modificar")
                {
                    form+='<div class="form-group">'+
                        '<label class="control-label col-md-1"></label>'+
                        '<button class="btn btn-success col-md-4" type="button" id="btnEnviar" onclick="Scaloneta.Principal.Modificar()">'+
                            'Modificar'+
                        '</button>'+
                        '<label class="control-label col-md-1"></label>'+
                        '<button class="btn btn-warning col-md-4" type="reset">'+
                            'Limpiar'+
                        '</button>';
                }
                else
                {
                    form+='<div class="form-group">'+
                        '<label class="control-label col-md-1"></label>'+
                        '<button class="btn btn-success col-md-4" type="button" id="btnEnviar" onclick="Scaloneta.Principal.AltaAuto()">'+
                            'Agregar'+
                        '</button>'+
                        '<label class="control-label col-md-1"></label>'+
                        '<button class="btn btn-warning col-md-4" type="reset">'+
                            'Limpiar'+
                        '</button>';
                }
                
                form+='</div>'+
                '</form>';
            
                $("#divAutos").html(form);
            }

            public static EliminarAuto(auto:any)
            {
                Scaloneta.Principal.LimpiarDivs();

                let confirmar = confirm("BORRAR AUTO:\n    modelo: "+auto.modelo+"\n    color: "+auto.color+"\n    marca: "+auto.marca);
                if (confirmar) {
                    
                    $.ajax({
                        type: 'DELETE',
                        url: URL+"cars/"+auto.id,
                        dataType:"json",
                        async: true
                    }
                    )
                    .done(function (resultado:any){
                        console.log(resultado);
                    
                        if(resultado.exito)
                        {
                            Scaloneta.Principal.MostrarAutos();
                        }
                    })
                    .fail(function (jqXHR:any, textStatus:any, errorThrown:any){
                        console.log(jqXHR.responseText.mensaje);
                    
                        if(!jqXHR.responseText.éxito)
                        {
                            if(jqXHR.responseText.status == 403)
                            {
                                window.location.replace(URL+"front-end-login");
                            }
                            $("#warning").removeClass("hide");
                            $("#warning").html(jqXHR.responseText.mensaje+'<button type="button" class="close" onclick="Scaloneta.Principal.LimpiarDivs()">&times;</button>');
                        }
                    
                    });
                }
            }

            public static ModificarAuto(auto:any)
            {
                Scaloneta.Principal.LimpiarDivs();

                Scaloneta.Principal.CrearForm("Modificar");
                $("#marca").val(auto.marca);
                $("#color").val(auto.color);
                $("#modelo").val(auto.modelo);
                $("#precio").val(auto.precio);
                $("#divHidden").val(auto.id);
            }

            public static Modificar()
            {
                Scaloneta.Principal.LimpiarDivs();

                let color = $("#color").val();
                let marca = $("#marca").val();
                let id = $("#divHidden").val();
                let modelo = $("#modelo").val();
                let precio = $("#precio").val();
    
                let auto:any = {}; 
    
                auto.id = id;
                auto.color = color;
                auto.marca = marca;
                auto.precio = precio;
                auto.modelo = modelo;
    
                let json = JSON.stringify({ "id_auto": auto.id, "color": auto.color, "marca": auto.marca, "precio": auto.precio, "modelo": auto.modelo });
    
                $.ajax(
                {
                    type: 'PUT',
                    url: URL + "cars/" + json,
                    dataType:'json',
                    data: JSON.stringify(auto),
                    async: true
                })
                .done(function (resultado:any){
                    console.log(resultado);
                    
                    if(resultado.exito)
                    {
                        Scaloneta.Principal.MostrarAutos();
                    }

                })
                .fail(function (jqXHR:any, textStatus:any, errorThrown:any){
                        let resultado = JSON.parse(jqXHR.responseText);
        
                        console.log(resultado);
        
                        if(!resultado.exito)
                        {
        
                            if(resultado.status == 403)
                            {
                                window.location.replace(URL + "login");
                            }
                            $("#warning").removeClass("hide");
                            $("#warning").html(resultado.mensaje + '<button type="button" class="close" onclick="Scaloneta.Principal.LimpiarDivs()">&times;</button>');
                            Scaloneta.Principal.MostrarAutos();
                        }
                    
                });
            }

            public static AltaAuto()
            {
                Scaloneta.Principal.LimpiarDivs();

                let color = $("#color").val();
                let marca = $("#marca").val();
                let modelo = $("#modelo").val();
                let precio = $("#precio").val();
                
                let auto:any = {}; 
                auto.color = color;
                auto.marca = marca;
                auto.precio = precio;
                auto.modelo = modelo;

                let form = new FormData();
                form.append("auto", JSON.stringify(auto));

            
                $.ajax({
                    type: 'POST',
                    url: URL,
                    dataType:'json',
                    contentType: false,
                    processData: false,
                    data: form,
                
                    async: true
                }
                )
                .done(function (resultado:any){
                    console.log(resultado);
                    
                    if(resultado.éxito)
                    {
                        $("#exito").removeClass("hide");
                        $("#exito").html(resultado.mensaje+'<button type="button" class="close" onclick="Scaloneta.Principal.LimpiarDivs()">&times;</button>');
                        Principal.MostrarAutos();
                    }

                })
                .fail(function (jqXHR:any, textStatus:any, errorThrown:any){
                    let resultado = JSON.parse(jqXHR.responseText);
                    console.log(resultado);
                    
                    if(!resultado.exito)
                    {
                        
                        if(resultado.status == 403)
                        {
                            window.location.replace(URL+"front-end-login");
                        }
                        $("#error").removeClass("hide");
                        $("#error").html(resultado.mensaje+'<button type="button" class="close" onclick="Scaloneta.Principal.LimpiarDivs()">&times;</button>');
                    }
                    
                });
            }
            //PARTE 3
            public static ModificarUsuario()
            {
                Scaloneta.Principal.LimpiarDivs();
                Scaloneta.Principal.CrearFormUsuario("Modificar");

                let correo = $("#correo").val();
                let nombre = $("#nombre").val();
                let id = $("#divHidden").val();
                let apellido = $("#apellido").val();
                let perfil = $("#perfil").val();
                //let foto = $("#foto").files();
                
                let form = new FormData();
                //let foto:any = (<HTMLInputElement>document.getElementById("foto")).files;
                form.append("foto", "null");
                //let fotovieja= foto;


                let usuario:any = {}; 
                usuario.id_usuario = id;
                usuario.correo = correo;
                usuario.nombre = nombre;
                usuario.apellido = apellido;
                usuario.perfil = perfil;
    
                form.append("usuario", JSON.stringify(usuario));

                $.ajax(
                {
                    type: 'POST',
                    contentType: false,
                    processData: false,
                    data: form,
                    url: URL + "users/edit",
                    dataType:'json',
                    async: true
                })
                .done(function (resultado:any){
                    console.log(resultado);
                    
                    if(resultado.exito)
                    {
                        Scaloneta.Principal.MostrarAutos();
                    }

                })
                .fail(function (jqXHR:any, textStatus:any, errorThrown:any){
                        console.log(jqXHR.responseText);
                        let resultado = JSON.parse(jqXHR.responseText);
        
                        console.log(resultado);
        
                        if(!resultado.exito)
                        {
        
                            if(resultado.status == 403)
                            {
                                window.location.replace(URL + "login");
                            }
                            $("#warning").removeClass("hide");
                            $("#warning").html(resultado.mensaje + '<button type="button" class="close" onclick="Scaloneta.Principal.LimpiarDivs()">&times;</button>');
                            Scaloneta.Principal.MostrarAutos();
                        }
                    
                });
            }
            public static EliminarUsuario(usuarios:any)
            {
                Scaloneta.Principal.LimpiarDivs();

                if (confirm("Confirma para eliminar el usuario:\nNombre: " + usuarios.nombre + "\nApellido: " + usuarios.apellido + "\nPerfil: " + usuarios.perfil)) 
                {
    
                    let usuario = {
                        "id_usuario": usuarios.id,
                    };
    
                    $.ajax(
                    {
                        type: 'POST',
                        url: URL + "users/delete",
                        dataType:'json',
                        data: "usuario=" + JSON.stringify(usuario),
                        async: true
                    })
                    .done(function (resultado:any)
                    {
                        console.log(resultado);
    
                        if(resultado.exito)
                        {
                            Scaloneta.Principal.MostrarUsuarios();
                        }
                    })
                    .fail(function (jqXHR:any, textStatus:any, errorThrown:any)
                    {
                        let retorno = JSON.parse(jqXHR.responseText);
    
                        if(!retorno.exito)
                        {
                            if(retorno.status == 403)
                            {
                                window.location.replace(URL + "/front-end-login");
                            }
    
                            $("#warning").removeClass("hide");
    
                            $("#warning").html(retorno.mensaje+'<button type="button" class="close" onclick="Scaloneta.Principal.DivReset()">&times;</button>');
    
                            Scaloneta.Principal.MostrarUsuarios();
                        }
                    });
                }
                
            }
            public static CrearFormUsuario(metodo:any)
            {
                /*
                let correo = $("#correo").val();
                let nombre = $("#nombre").val();
                let id = $("#divHidden").val();
                let apellido = $("#apellido").val();
                let perfil = $("#perfil").val();
                let foto = $("#foto").val();
                */
                Scaloneta.Principal.LimpiarDivs();
                let form:any='<form action="" id="loginForm" method="post" class="well form-horizontal col-md-6" style="background-color:darkcyan; margin-left:125px;margin-top:25px">'+

                '<div class="form-group">'+
                    '<div class="col-md-12 inputGroupContainer">'+
                        '<div class="input-group">'+
                            '<span class="input-group-addon"><i class="fas fa-trademark"></i></span>'+
                            '<input type="text" name="correo" id="correo" class="form-control" placeholder="Mrca">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            
                '<div class="form-group">'+
                    '<div class="col-md-12 inputGroupContainer">'+
                        '<div class="input-group">'+
                            '<span class="input-group-addon"><i class="fas fa-palette"></i></span>'+
                            '<input type="text" name="nombre" id="nombre" class="form-control" placeholder="Color">'+
                        '</div>'+
                    '</div>'+
                '</div>'+

                '<div class="form-group">'+
                    '<div class="col-md-12 inputGroupContainer">'+
                        '<div class="input-group">'+
                            '<span class="input-group-addon"><i class="fas fa-car"></i></span>'+
                            '<input type="text" name="apellido" id="apellido" class="form-control" placeholder="Modelo">'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            
                '<div class="form-group">'+
                    '<div class="col-md-12 inputGroupContainer">'+
                        '<div class="input-group">'+
                            '<span class="input-group-addon"><i class="fas fa-dollar-sign"></i></span>'+
                            '<input type="text" name="perfil" id="perfil" class="form-control" placeholder="Precio">'+
                        '</div>'+
                    '</div>'+
                '</div>';
            
                '<div class="form-group">'+
                    '<div class="col-md-12 inputGroupContainer">'+
                        '<div class="input-group">'+
                            '<span class="input-group-addon"><i class="fas fa-dollar-sign"></i></span>'+
                            '<input name="foto" class="form-control" type="file" id="foto">'+
                        '</div>'+
                    '</div>'+
                '</div>';

                if(metodo == "Modificar")
                {
                    form+='<div class="form-group">'+
                        '<label class="control-label col-md-1"></label>'+
                        '<button class="btn btn-success col-md-4" type="button" id="btnEnviar" onclick="Scaloneta.Principal.ModificarUsuario()">'+
                            'Modificar'+
                        '</button>'+
                        '<label class="control-label col-md-1"></label>'+
                        '<button class="btn btn-warning col-md-4" type="reset">'+
                            'Limpiar'+
                        '</button>';
                }
                else
                {
                    form+='<div class="form-group">'+
                        '<label class="control-label col-md-1"></label>'+
                        '<button class="btn btn-success col-md-4" type="button" id="btnEnviar" onclick="Scaloneta.Principal.AltaUsuario()">'+
                            'Agregar'+
                        '</button>'+
                        '<label class="control-label col-md-1"></label>'+
                        '<button class="btn btn-warning col-md-4" type="reset">'+
                            'Limpiar'+
                        '</button>';
                }
                form+='</div>'+
                '</form>';
            
                $("#divUsuarios").html(form);
            }
        }
    }