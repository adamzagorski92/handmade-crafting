## Preference:

### CSS @media — preferencje systemowe

| Media query                  | Wartości                    | Co wykrywa                        |
| ---------------------------- | --------------------------- | --------------------------------- |
| prefers-color-scheme         | light / dark                | tryb jasny/ciemny                 |
| prefers-reduced-motion       | reduce / no-preference      | czy użytkownik wyłączył animacje  |
| prefers-contrast             | more / less / no-preference | wysoki kontrast (accessibility)   |
| prefers-reduced-transparency | reduce / no-preference      | czy wyłączył przezroczystości     |
| prefers-reduced-data         | reduce / no-preference      | oszczędzanie danych (słabe łącze) |
| forced-colors                | active / none               | Windows High Contrast Mode        |
| inverted-colors              | inverted / none             | odwrócone kolory (accessibility)  |

### JavaScript navigator — dane urządzenia/przeglądarki

| Właściwość                    | Przykład wartości  | Co zwraca                        |
| ----------------------------- | ------------------ | -------------------------------- |
| navigator.language            | "pl-PL"            | główny język przeglądarki        |
| navigator.languages           | ["pl-PL", "en-US"] | lista preferowanych języków      |
| navigator.onLine              | true / false       | czy jest połączenie z internetem |
| navigator.hardwareConcurrency | 8                  | liczba rdzeni CPU                |
| navigator.deviceMemory        | 4                  | RAM w GB (przybliżony)           |
| navigator.cookieEnabled       | true / false       | czy cookies są włączone          |
| navigator.maxTouchPoints      | 0 / 5              | czy urządzenie dotykowe          |

## Journal

- I have to trigger all errors come from backend (based on [documentation]('https://docs.coingecko.com/docs/common-errors-rate-limit')):
