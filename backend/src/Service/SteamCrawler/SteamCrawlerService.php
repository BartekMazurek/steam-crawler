<?php

declare(strict_types=1);

namespace App\Service\SteamCrawler;

use App\Document\Game;
use Doctrine\ODM\MongoDB\DocumentManager;

class SteamCrawlerService implements SteamCrawlerInterface
{
    private $documentManager;
    private $apiGamesEndpoint;

    public function __construct(DocumentManager $documentManager)
    {
        $this->documentManager = $documentManager;
        $this->apiGamesEndpoint = $_ENV['GAMES_ENDPOINT'];
    }

    public function getGames(): void
    {
        $this->saveData($this->fetchData());
    }

    public function clearGames(): void
    {
        $this->dropDocumentCollection();
    }

    private function fetchData(): array
    {
        $jsonData = file_get_contents($this->apiGamesEndpoint);
        $data = json_decode($jsonData, true);
        return $data;
    }

    private function saveData(array $dataToSave): void
    {
        if (!empty($dataToSave['applist']['apps']['app'])) {
            foreach ($dataToSave['applist']['apps']['app'] as $data) {
                $game = new Game();
                $game->setSteamId($data['appid']);
                $game->setName($data['name']);
                $this->documentManager->persist($game);
            }
            $this->documentManager->flush();
        }
    }

    private function dropDocumentCollection(): void
    {
        $this->documentManager->getSchemaManager()->dropDocumentCollection(Game::class);
    }
}
