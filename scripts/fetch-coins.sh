#!/bin/bash
# =============================================================
# fetch-coins.sh — fetches coin data from CoinGecko API
# and appends each coin as an object to data/coins.json
#
# USAGE:
#   ./scripts/fetch-coins.sh
#
# HOW IT WORKS:
#   1. BASE_URL      — base API endpoint for all coin requests
#   2. mkdir -p      — creates data/ dir if it doesn't exist
#   3. [ ! -f ]      — creates empty JSON array [] if file missing
#   4. fetch_coin()  — function that takes coin id as $1 (1st arg)
#      curl -s       — fetches coin data silently (no progress bar)
#      jq -s         — slurp: merges two inputs into one array
#      '.[0]+[.[1]]' — appends new coin object to existing array
#      > tmp.json    — writes to temp file (can't overwrite in-place)
#      && mv         — replaces original only if jq succeeded
# =============================================================

BASE_URL="https://api.coingecko.com/api/v3/coins"

mkdir -p data
[ ! -f data/coins.json ] && echo "[]" > data/coins.json

fetch_coin() {
    local COIN=$1
    echo "Pobieranie $COIN"
    curl -s "$BASE_URL/$COIN" \
        | jq -s '.[0] + [.[1]]' data/coins.json - > tmp.json \
        && mv tmp.json data/coins.json
}

fetch_coin "bitcoin"
fetch_coin "ethereum"
fetch_coin "zyfi"

echo "Done! Saved to data/coins.json"