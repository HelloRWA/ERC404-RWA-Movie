# ERC404 RWA Movie


This is the frontend code for the ERC404 RWA Movie project. It build on the  open source template [Nuxt Movie](https://github.com/nuxt/movies).


## Demo

* [Demo website](https://movie.rwa-wallet.com)
* [ERC404 Movie Contract deployment on FVM](https://calibration.filfox.info/en/address/0x45054dF2E1b3b241F2fD9C1fF934c5D2BbCd602b)
* [BST Coin Contract deployment on FVM](https://calibration.filfox.info/en/address/0x0eE3cf9f7f3954b13db8EB7d57B77D1bB6Eb299b)


## Features

- [x] User can launch a new ERC404 token by any movie (need to pay 100 $BST)
- [x] User can buy SBT of any movie
  - [ ] which can access the SBT permission discord channel for the movie
- [x] User can buy Coin of any movie
  - [ ] which can access the coin permission discord channel for the movie, can setup differnt amount of coins with different channel.
- [x] User can buy NFT of any movie
  - [ ] which can access the NFT permission discord channel for the movie
- [x] User can unlock posts / blogs if they owned NFT/ Specify amount of coin or SBT. The condition can be different from different posts/blogs.
- [ ] NFT can be trade on opensea
- [ ] FT can be trade on opensea
- [ ] NFT owner can edit NFT avatar, which shows on opensea

## Below is the README from the open source template [Nuxt Movie](https://github.com/nuxt/movies)
<hr />
<br />
<br />
<br />

<br><p align="center">
<img height="100px" src="./public/movies.webp" />
</p>

<h1 align="center">Nuxt Movies</h1>
<br>

> Movies app demo built using [Nuxt 3](https://github.com/nuxt/nuxt), [Vue 3](https://github.com/vuejs/core), [UnoCSS](https://github.com/unocss/unocss), [Image Module](https://v1.image.nuxtjs.org), [The Movie Database](https://www.themoviedb.org) [API](https://www.themoviedb.org/documentation/api) and [TypeScript](https://github.com/microsoft/TypeScript).

**🍿 Live preview:** https://movies.nuxt.space

## Screenshots

<img width="1191" src="https://user-images.githubusercontent.com/11247099/171109597-ee4fb47c-48b5-4dba-94b3-a56e0083c142.png">
<img width="1191" src="https://user-images.githubusercontent.com/11247099/171109632-d9b480c4-e640-4812-8ea6-ccc6d17daa6a.png">
<img width="1191" src="https://user-images.githubusercontent.com/11247099/171109644-c586de96-04be-4ae7-8a7b-c0d615a2ecba.png">
<img width="764" src="https://user-images.githubusercontent.com/11247099/171109653-7137e2e5-ca06-4a30-9caa-bacdbc739121.png">

## Proxy Server

Check [proxy/README](./proxy)

## Setup

``` bash
# Enable pnpm
$ corepack enable

# Install dependencies
$ pnpm install

# Start dev server with hot reload at localhost:3000
$ pnpm dev
```

## Credits

Based on [jasonujmaalvis/vue-movies](https://github.com/jasonujmaalvis/vue-movies) and [tastejs/nuxt-movies](https://github.com/tastejs/nuxt-movies).

<img height="50px" src="./public/tmdb.svg">

Data provided by [The Movie Database](https://www.themoviedb.org).

This project uses the TMDB API but is not endorsed or certified by TMDB.
