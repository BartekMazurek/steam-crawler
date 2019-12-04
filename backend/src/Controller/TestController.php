<?php

namespace App\Controller;

use App\Document\Game;
use Doctrine\ODM\MongoDB\DocumentManager;
use MongoDB\BSON\Regex;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TestController extends AbstractController
{
    /**
     * @Route("/test", name="test")
     */
    public function index(DocumentManager $dm)
    {

        $products = $dm->createQueryBuilder(Game::class)
            ->field('steamId')->equals(583416)
            ->getQuery()
            ->execute();

        var_dump($products);

        return new JsonResponse("ok");
    }

    /**
     * @Route("/test2", name="test2")
     */
    public function test(DocumentManager $dm)
    {
        $regex = new Regex('^Bleach');


        $repository = $dm->getRepository(Game::class);
        $games = $repository->findBy(['name' => $regex]);
        echo gettype($games);
        exit;
        $i=0;
        $gamesArray = [];
        foreach ($games as $game) {
            $gamesArray[$i]['id'] = $game->getSteamId();
            $gamesArray[$i]['name'] = $game->getName();
            $i++;
        }
        var_dump($gamesArray);
        exit;
        return new JsonResponse("ok");

    }
}
