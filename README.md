# UC Vote

A Rails and React app for voting in Uniting Church style elections.

Currently, the only supported voting mode is
[Block Voting](https://en.wikipedia.org/wiki/Multiple_non-transferable_vote).

## Development

To run the application locally, you'll need:

* The ruby version given in [.ruby-version](./.ruby-version)
    * Consider using [rbenv](https://github.com/rbenv/rbenv)
* A current node version
    * Consider using [n](https://github.com/tj/n)
* A Google Oauth2 Client Id and Secret
* PostgreSQL

Copy `.env.example` to `.env` and fill in all the environment variables. Then run:

```
bundle install
yarn install
rails db:create
rails db:migrate
rails serve & bin/webpack-dev-server
```
