# Exportify

> Export your saved Spotify songs as Youtube videos (just links for now)

## Usage

You need a Spotify Developer account. [Go here](https://developer.spotify.com/dashboard/) to get one.

- Create a spotify-api app

![create app click](./public/screenshots/create-app-click.png)

- Name it whatever you want and click Create

![create app](./public/screenshots/create-app.png)

- Edit the settings to add a callback URL (http://localhost:3000)

![edit-settings](./public/screenshots/edit-settings.png)
![redirect](./public/screenshots/redirect.png)

- Copy the tokens

![copy client](./public/screenshots/copy-client.png)
![copy secrent](./public/screenshots/copy-secret.png)

- Now clone this repo and create an `.env` file

```bash
git clone https://github.com/pablopunk/exportify
cd exportify
touch .env
```

- Modify the `.env` to reflect the tokens you copied before from Spotify

```
SPOTIFY_CLIENT_ID=...
SPOTIFY_SECRET=...
```

- Now install the dependencies and run this project:

```
npm install
npm run dev
```

- Visit [localhost:3000](http://localhost:3000)

![app index](./public/screenshots/app-index.png)
![app songs](./public/screenshots/app-songs.png)
