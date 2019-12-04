# steamCrawler (Angular + Symfony Api + MongoDB)
SteamCrawler is a simple application that allows you to download all steam_ids into local MongoDB database and check prices in realtime by calling SteamAPI.

![Stocks API image](http://bartekblog.prv.pl/steam_crawler/sc1.PNG)
![Stocks API image](http://bartekblog.prv.pl/steam_crawler/sc2.PNG)
![Stocks API image](http://bartekblog.prv.pl/steam_crawler/sc4.PNG)

# Requirements
- PHP 7+
- Angular 7+
- MongoDB
- Composer

# How to run
- Download project files (frontend & backend folder).
- Install all dependencies (composer install in 'backend' folder & npm install --save in 'frontend' folder).
- Start development WWW server (symfony server:start for 'backend' & ng serve for 'frontend').
- In 'backend' folder edit .env file and set proper configuration for MONGODB_URL & MONGODB_DB parameters.
- In 'frontend' folder find file environment.ts (src -> environments -> environment.ts) and set proper path to 'backend' folder on your WWW server - it's necessary to communicate frontend with backend API.
- During the first start of application click "Fetch Database" button to download all steam games into your local database - wait untill you see a success message.
- To find game type a name into searchbar and click "Search" button.
- On the list with games you can click "More details" to preview current game price in Steam shop.
- To refresh database click "Clear Database" button and after cleaning process click "Fetch Database".
- To change price currency you can manipulate CRAWLER_CURRENCY_CODE parameter in .env file ('backend' folder).
