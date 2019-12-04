<?php

namespace App\Service\SteamCrawler;

interface SteamCrawlerInterface
{
    public function getGames(): void;
    public function clearGames(): void;
}
