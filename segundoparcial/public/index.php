<?php
use \Slim\Routing\RouteCollectorProxy;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use Slim\Factory\AppFactory;
use Slim\Views\Twig;
use Slim\Views\TwigMiddleware;

require __DIR__ . '/../vendor/autoload.php';

require "../src/poo/AccesoDatos.php";
require "../src/poo/auto.php";
require "../src/poo/usuario.php";
require "../src/poo/MW.php";

$app = AppFactory::create();
$twig = Twig::create('../src/views', ['cache' => false]);
$app->add(TwigMiddleware::create($app, $twig));
$app->get('/front-end-login', function (Request $request, Response $response, array $args) : Response {  

    $view = Twig::fromRequest($request);
    return $view->render($response, 'login.html');
    
  });
$app->get('/front-end-registro', function (Request $request, Response $response, array $args) : Response {  
  $view = Twig::fromRequest($request);
  return $view->render($response, 'registro.html');
});

$app->get('/front-end-principal', function (Request $request, Response $response, array $args) : Response {  
  $view = Twig::fromRequest($request);
  return $view->render($response, 'principal.php');
});


$app->post('/usuarios[/]', \Usuario::class . '::AltaUsuario')->add(\MW::class.":NoEstanDB")->add(\MW::class.":EstanVacios");

$app->post('/login[/]', \Usuario::class . '::LoginUsuarioJson')->add(\MW::class.":EstanDB")->add(\MW::class.":EstanVacios");


$app->get('/autos/[{id_auto}]', \Auto::class . '::ListarAutos');

$app->group('/cars', function (\Slim\Routing\RouteCollectorProxy $cars)
{
    $cars->delete('/{id_auto}', \Auto::class . ':BorrarAuto');
    $cars->put('/{auto}', \Auto::class . ':ModificarAuto');
});

$app->group('/users', function (\Slim\Routing\RouteCollectorProxy $cars) {   

  $cars->post('/delete',\Usuario::class . ':BorrarUsuario');
  $cars->post('/edit',\Usuario::class . ':ModificarUsuario');
});

$app->group('/tablas', function (\Slim\Routing\RouteCollectorProxy $tablas) {   

  $tablas->get('/usuarios',\Usuario::class . ':ListarUsuarios') ->add(\MW::class.":MostrarUsuarios");
  $tablas->post('/usuarios',\Usuario::class . ':ListarUsuarios')->add(\MW::class.":MostrarUsuarios");
  $tablas->get('/autos',\Usuario::class . ':ListarAutos') ->add(\MW::class.":MostrarAutos");
});
$app->get('/', Usuario::class . ':ListarUsuarios');
$app->post('/', \Auto::class . '::AltaAuto');
$app->put('/', \Auto::class . '::ModificarAuto');

$app->run();