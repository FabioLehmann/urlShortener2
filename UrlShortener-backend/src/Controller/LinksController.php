<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Validator\Constraints as Assert;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;

use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

use Psr\Log\LoggerInterface;


class LinksController extends Controller 
{
    /**
     * @Route("/links", name="links",methods={"GET","HEAD"}))
     */
	public function getlinks(LoggerInterface $logger,EntityManagerInterface $entityManager)
	{	
		$request = Request::createFromGlobals();
		$RAW_QUERY = 'SELECT id, source,target,DATE_FORMAT(uploaded_date, "%d.%m.%Y")  as uploaded_date
from urls;';
     
		$statement = $entityManager->getConnection()->prepare($RAW_QUERY);
		$statement->execute();

		$result = $statement->fetchAll();
		$response = new Response();
		$response->setContent(json_encode(array(
			'data' => $result
		)));
		return $response;
	}
	
    /**
     * @Route("/links",name="newlink",methods={"POST"}))
     */
 	public function createUrl(LoggerInterface $logger,EntityManagerInterface $entityManager)
 	{	
		$request = Request::createFromGlobals();
	    $data = json_decode(
	               $request->getContent(),
	               true
	           );
		
		$source = $data['name'];
		$webapp_name = "http://localhost:4200/";
		$target = $webapp_name.md5($source) ;
		$date =  date('Y-m-d');	
		$logger->info($source);
		
		
		$RAW_QUERY = "SELECT *  from urls where source ='$source';";
		$statement = $entityManager->getConnection()->prepare($RAW_QUERY);
		$statement->execute();
		$result = $statement->fetchAll();
		if(empty($result)){
		
			$RAW_QUERY = "INSERT INTO urls (source, target, uploaded_date)
	VALUES ('$source', '$target', '$date');";
     
			$statement = $entityManager->getConnection()->prepare($RAW_QUERY);
			$statement->execute();
			$RAW_QUERY = "SELECT *  from urls where source ='$source';";
			$statement = $entityManager->getConnection()->prepare($RAW_QUERY);
			$statement->execute();
			$result = $statement->fetchAll();
			
		}
		else{$result = FALSE;}
		
		
		$response = new Response();
		$response->setContent(json_encode(array(
			$result[0]
		)));
		
	

 		return $response;
 	}
    /**
       * @Route("/links/{id}/", name="redirectlink",methods={"GET","HEAD","OPTIONS"})))
       */
	public function redirectlink(LoggerInterface $logger,EntityManagerInterface $entityManager,$id)
	{	
		
		$webapp_name = "http://localhost:4200/";
		$target = $webapp_name.$id;
		$RAW_QUERY = "SELECT source from urls WHERE target = '$target';";
     
		$statement = $entityManager->getConnection()->prepare($RAW_QUERY);
		$statement->execute();

		$result = $statement->fetchAll();
		
		
		if(!isset($result[0]['source'])){
			$url = $webapp_name;
		}
		else{
			$url = $result[0]['source'];	
		}
		$response = new Response();
		
		
		$response->setContent(json_encode(array(
			'url' => $url
		)));
		// return $this->redirect($url);
		
		return $response;
	}
}
