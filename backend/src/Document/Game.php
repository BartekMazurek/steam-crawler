<?php

declare(strict_types=1);

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document
 */
class Game
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\Field(type="integer")
     */
    protected $steamId;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $name;

    /**
     * @return mixed
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId(string $id): void
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getSteamId(): int
    {
        return $this->steamId;
    }

    /**
     * @param mixed $steamId
     */
    public function setSteamId(int $steamId): void
    {
        $this->steamId = $steamId;
    }

    /**
     * @return mixed
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }
}
