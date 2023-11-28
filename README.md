# Cookidoo Scraper

 <img src="https://img.shields.io/github/workflow/status/tobim-dev/cookidoo-scraper/docker_build" />

This project implements a REST API of the Cookidoo® website. For example, you can retrieve recipe information for a
specific recipe or information for all recipes on your weekly schedule. To get the information, the Cookidoo® website is
scraped.

## Motivation

In order to use the recipe information of Cookidoo in other Apps and services, e.g. for food tracking apps or widget
apps, I find it really usefull you have a REST API to get this information. This projects aims to establish such an API.

## Tech used

- Express.js - Build the API
- GOT - Request the Cookidoo website
- JSDOM - Render the website and scrape information
- Pupeteer - Login and get the authentification token cookie to access authorized pages
- Node-Cache - Caching recipe information

## Installation

1. Clone this reposity

```bash
git clone https://github.com/tobim-dev/cookidoo-scraper-simple.git
```

2. Install dependencies

```bash
cd cookidoo-scraper-simple && npm install
```

3. Set environment variables in a .env file in the project root directory. Example:

```
PORT=8000
COOKIDOO_RECIPE_BASE_URL=https://cookidoo.de/recipes/recipe/de-DE/
COOKIDOO_HOME_URL=https://cookidoo.de/foundation/de-DE
COOKIDOO_TIMELINE_URL=https://cookidoo.de/planning/de-DE/timeline/
```

1. Start

```bash
npm run start
```

## API Reference

API reference is documented via Swagger and can be accessed on '/api-docs'

## Run production via Docker

You can use docker to run the API in production mode. For that you need to set the environment variables when creating
the docker container.

To run the docker container:

```bash
docker run -d -e NODE_ENV='production' \
-e PORT='8000' \
-e COOKIDOO_RECIPE_BASE_URL='https://cookidoo.de/recipes/recipe/de-DE/' \
-e COOKIDOO_HOME_URL='https://cookidoo.de/foundation/de-DE' \
-e COOKIDOO_TIMELINE_URL='https://cookidoo.de/planning/de-DE/timeline/' \
-p 8000:8000 tobin2010/cookidoo-scraper
```

### Tasks on roadmap 

- Implement Error Handling
- Implement Recipe Information by Watchlist
- Implement Recipe Information by Collection

### Licence

MIT License

Copyright (c) 2021 Tobias

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
