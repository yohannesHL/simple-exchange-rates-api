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

- `GET /rates/<currency-code>` - Returns exhange rates for a given `<currency-code>`

- `GET /rates/<from-currency>/convert?to=<to-currency>&amount=<from-amount>` - Get currency conversion of `<from-amount>` `<from-currency>` to `<to-currency>`. 

- `GET /transfers?toCurrency=<to-currency>&balance=<balance>&balance=<balance>` - Returns the sum of 1 or more `<balance>` amounts (ie: `10 USD`) in converted currency `<to-currency>` amount.

## Examples:


1. Get GBP rates: http://localhost:3000/rates/GBP/
    Returns:

    ```
    {
    "ok": true,
    "data": {
        "baseCurrency": "GBP",
        "rates": {
        "EUR": 1.11768,
        "USD": 0.78569,
        "CAD": 1.67642,
        "INR": 88.2653,
        "MXN": 24.4773,
        "AUD": 1.82685,
        "CNY": 8.75907,
        "MYR": 5.26652,
        "COP": 4076.9
        }
    }
    }
    ```

2. Convert 90 GBP to EUR: http://localhost:3000/rates/GBP/convert?to=EUR&amount=90 

    Returns:

    ```
    {
    "ok": true,
    "data": {
        "from": {
        "currency": "GBP",
        "value": 90
        },
        "to": {
        "currency": "EUR",
        "value": 100.5912
        },
        "rate": 1.11768
    }
    }
    ```

3. Add all balances (13.12 EUR + 99 GBP) and convert to CAD: http://localhost:3000/transfers?balance=13.12%20EUR&balance=99%20GBP&toCurrency=CAD

    Returns:

    ```
    {
    "ok": true,
    "data": {
        "balances": [
        {
            "value": 13.12,
            "currency": "EUR"
        },
        {
            "value": 99,
            "currency": "GBP"
        }
        ],
        "transferedBalance": {
        "currency": "CAD",
        "value": 185.64
        }
    }
    }
    ```

##
## Testing

Tests are found in `*.spec.ts` files next to the module under test.

```bash
# Run all tests

$ npm run test
```
