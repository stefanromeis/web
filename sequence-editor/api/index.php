<?php
/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *‚
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';
require 'idiorm.php';
require 'paris.php';
require 'user.php';  // nennne diese .php wie deine  mysql-tabelle!
require 'images.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();

//Hier deine spezifischen Werte eintragen!

ORM::configure('mysql:host=localhost;dbname=sequence_editor'); 
ORM::configure('username', 'root');
ORM::configure('password', '');

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */

 // GET route
$app->get(
    '/user',
    function () {
    	$app = \Slim\Slim::getInstance(); 
    	if(isset($_GET['email'])){
    		$sequences=Model::factory('user')->where('email',$_GET['email'])->find_array();
			echo json_encode($sequences);
    	}
		else{
			$app->halt(400, ("missing arguments"));
		} 
    }
);

 
// GET route
$app->get(
    '/user/:id',
    function ($id) {
		$sequence = Model::factory('user')->find_one($id);
		$app = \Slim\Slim::getInstance();
		if($sequence){
			echo json_encode($sequence->as_array());
		}
		else{
			$app->halt(404, ("sequence id not found"));
		}
    }
);

// POST route
$app->post(
    '/user',
    function () {
    	$app = \Slim\Slim::getInstance();
		$requestBody = $app->request()->getBody();
		$json_a = json_decode($requestBody,true);
		if(isset($json_a['json']) && isset($json_a['email']) && isset($json_a['name'])){
			$seq = Model::factory('user')->create();
			$seq->name = $json_a['name'];
			$seq->email = $json_a['email'];
			$seq->json = $json_a['json'];
			$seq->save();
        	echo json_encode($seq->as_array());
    	}
		else{
			$app->halt(400, ("missing arguments"));
		}
    }
);

// PUT route
$app->put(
    '/user/:id',
    function ($id) {
    	$sequence = Model::factory('user')->find_one($id);
		$app = \Slim\Slim::getInstance();
		if($sequence){			
			$requestBody = $app->request()->getBody();
			$json_a = json_decode($requestBody,true);
			if (isset($json_a['json'])) $sequence->json = $json_a['json'];
			if (isset($json_a['email'])) $sequence->email = $json_a['email'];
			if (isset($json_a['name'])) $sequence->name = $json_a['name'];
			$sequence->save();
	        echo json_encode($sequence->as_array());
	    }
		else{
			$app->halt(404, ("sequence not found"));
		}
    }
);

// DELETE route
$app->delete(
    '/user/:id',
    function ($id) {
    	$sequence = Model::factory('user')->find_one($id);
		$app = \Slim\Slim::getInstance();
		if($sequence){
			$result = $sequence->delete();
			echo json_encode($result);
		}
		else{
			$app->halt(404, ("sequence id not found"));
		}
    }
);


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
