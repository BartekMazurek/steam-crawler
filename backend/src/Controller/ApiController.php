<?php

namespace App\Controller;

use App\Service\SteamCrawler\SteamCrawlerDataProvider;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\SteamCrawler\SteamCrawlerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ApiController extends AbstractController
{
    private $steamCrawlerService;
    private $steamCrawlerDataProvider;

    public function __construct(
        SteamCrawlerService $steamCrawlerService,
        SteamCrawlerDataProvider $steamCrawlerDataProvider
    )
    {
        $this->steamCrawlerService = $steamCrawlerService;
        $this->steamCrawlerDataProvider = $steamCrawlerDataProvider;
    }

    /**
     * @Route("/api/games", name="api_games")
     */
    public function apiGames(): JsonResponse
    {
        try {
            $this->steamCrawlerService->getGames();
            return new JsonResponse("success");
        } catch (\Exception $e) {
            return new JsonResponse("error");
        }
    }

    /**
     * @Route("/api/game", name="api_game")
     */
    public function apiGame(Request $request): JsonResponse
    {
        $appId = (int) $request->request->get('appId');
        return new JsonResponse($this->steamCrawlerDataProvider->getGame($appId));
    }

    /**
     * @Route("/api/show", name="api_show")
     */
    public function apiList(Request $request): JsonResponse
    {
        $query = (string) $request->request->get('queryString');
        return new JsonResponse($this->steamCrawlerDataProvider->getList($query));
    }

    /**
     * @Route("/api/clear", name="api_clear")
     */
    public function apiClear(Request $request): JsonResponse
    {
        try {
            $this->steamCrawlerService->clearGames();
            return new JsonResponse("success");
        } catch (\Exception $e) {
            return new JsonResponse("error");
        }
    }
}
