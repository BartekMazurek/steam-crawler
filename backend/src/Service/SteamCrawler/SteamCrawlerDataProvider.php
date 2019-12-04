<?php

declare(strict_types=1);

namespace App\Service\SteamCrawler;

use App\Document\Game;
use Doctrine\ODM\MongoDB\DocumentManager;
use MongoDB\BSON\Regex;

class SteamCrawlerDataProvider
{
    private $documentManager;
    private $apiGameEndpoint;
    private $countryCode;
    private $filterType;

    public function __construct(DocumentManager $documentManager)
    {
        $this->documentManager = $documentManager;
        $this->countryCode = $_ENV['CRAWLER_CURRENCY_CODE'];
        $this->filterType = "price_overview";
        $this->apiGameEndpoint = $_ENV['GAME_OVERVIEW_ENDPOINT'];
    }

    public function getGame(int $appId): array
    {
        return $this->fetchData($appId);
    }

    public function getList(string $query): array
    {
        $regex = new Regex('^'.$this->parseQueryString($query));
        $games = $this->documentManager->getRepository(Game::class)->findBy(['name' => $regex]);
        if (!empty($games)) {
            return $this->parseList($games);
        }
        return [];
    }

    private function parseList(array $games): array
    {
        $i = 0;
        $gamesArray = [];
        foreach ($games as $game) {
            $gamesArray[$i]['steamId'] = $game->getSteamId();
            $gamesArray[$i]['name'] = $game->getName();
            $i++;
        }
        return $gamesArray;
    }

    private function fetchData(int $appId): array
    {
        $jsonData = file_get_contents($this->apiGameEndpoint.$appId.'&cc='.$this->countryCode.'&filters='.$this->filterType);
        if (!empty($jsonData)) {
            $decodedData = json_decode($jsonData, true);
            if ($decodedData[$appId]['success'] === true) {
                return $decodedData[$appId]['data'];
            }
        }
    }

    private function parseQueryString(string $queryString): string
    {
        $lowercaseString = strtolower($queryString);
        $stringArray = explode(' ', $lowercaseString);
        $concatenatedString = '';
        foreach ($stringArray as $string) {
            $concatenatedString .= ucfirst($string).' ';
        }
        return trim($concatenatedString);
    }
}
