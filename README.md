# Bitcoin Source API

Public rest APIs for networks supported by bitcoin-source

## Installation

-   clone repo: `git clone https://github.com/the-bitcoin-token/bitcoin-source-api.git`
-   move to folder: `cd bitcoin-source-api`
-   install: `npm install`
-   install flow types: `npx flow-typed install`

## Test

-   run unit tests: `npm run test`
-   run Flow: `npm run flow`
-   run Lint: `npm run lint`
-   generate docs: `npm run docs`
-   test coverage: `npm run coverage`

Integration tests are currently skipped to make the app easily portable.

## Contact

If you have any problems or questions, please email brentongunning@gmail.com

## Troubleshooting

**Missing packages or objects during lint**

If the `npm run lint` returns flow errors complaining about missing packages or objects that
should be present, flow's cache is likely out of date. Run `npx flow stop`.
