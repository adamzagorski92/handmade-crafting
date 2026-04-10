#!/bin/bash

BASE_URL="https://api.coingecko.com/api/v3/coins/list?status=active"

mkdir -p data
[ ! -f data/idCoinsList.json ] && echo "[]" > data/idCoinsList.json

fetch_list() {
    echo "Pobieranie "
    curl -s "$BASE_URL" \
        | jq '[.[] | {id, name}]' \
        > data/idCoinsList.json
}

fetch_list

echo "Done! Saved to data/cidCoinsList.json"