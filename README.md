# cookidoo-scraper

You need to set the following env variables:

COOKIDOO_RECIPE_BASE_URL COOKIDOO_HOME_URL PORT

To run the docker container:

```bash
docker run -d -e PORT='8000' -e COOKIDOO_RECIPE_BASE_URL='https://cookidoo.de/recipes/recipe/de-DE/' -e COOKIDOO_HOME_URL='https://cookidoo.de/foundation/de-DE' -p 8000:8000 tobin2010/cookidoo-scraper`
```

### Tasks

- Encasulate Config
- Implement Error Handling
- Implement Recipe Information by Watchlist
- Implement Recipe Information by Collection
