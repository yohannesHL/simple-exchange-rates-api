# Simple Exchange rates API

version: 5b8d0fd276b6d288905ed2f63a934e057e8feca2

### Requirements
* [Node.js](https://nodejs.org/en/download/) 


## Getting started

```bash

# create a .env enironment configuration using the provided template
$ cp env.template .env

# Install packages
$ npm i

# Start development server
$ npm run devServer
```
## Exploring the API

Open you browser and go to: http://localhost:3000.
> Note: If you changed the HTTP_PORT on your .env file then this would be `http://localhost:<HTTP_PORT>`

check the endpoints:

- `GET /rates` - Returns USD exchange rates

- `GET /rates/GBP` - Returns GBP exhange rates

- `GET /rates/<from-currency>/convert?to=<to-currency>&amount=<from-amount>` - Get currency conversion of `<from-amount>` `<from-currency>` to `<to-currency>`. For example: `GET /rates/GBP/convert?to=EUR&amount=90` will get the currency conversion of 90 GBP to EUR.

- `GET /transfers?balance=13.12%20EUR&balance=99%20GBP&toCurrency=CAD` - Returns the sum of 1 or more balances in converted currency `toCurrency`


## Testing

Tests are found in `*.spec.ts` files next to the module under test.

```bash
# Run all tests

$ npm run test
```
