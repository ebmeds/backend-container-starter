Express & ES6 REST API Boilerplate for EBMeDS
==================================

This is a straightforward boilerplate for building REST APIs with ES6 and Express.

- ES6 support via [babel](https://babeljs.io)
- REST resources as middleware via [resource-router-middleware](https://github.com/developit/resource-router-middleware)
- Body parsing via [body-parser](https://github.com/expressjs/body-parser)
- Logging with [bunyan](https://github.com/trentm/node-bunyan), logging by default to Logstash with [bunyan-logstash-tcp](https://github.com/transcovo/bunyan-logstash-tcp)
- Utility functions provided by [lodash](https://lodash.com/)
- Unit testing with [Mocha](https://mochajs.org) and [Chai](http://chaijs.com)
- Code coverage with [Istanbul](https://gotwarlost.github.io/istanbul/)
- Linting with [eslint](https://eslint.org) using [AirBnb rules](https://github.com/airbnb/javascript) in conjunction with [prettier rules](https://github.com/prettier/eslint-config-prettier) and the [eslint-prettier plugin](https://github.com/prettier/eslint-plugin-prettier)
- Forced linting and test success before each git commit with [pre-commit](https://github.com/observing/pre-commit)
- Pre-made Dockerfile using a [alpine-node](https://github.com/mhart/alpine-node) base image
- Pre-configured [CircleCI config file](https://circleci.com)

Getting Started
---------------

First, [fork this repo](https://help.github.com/articles/fork-a-repo/). Then, [rename the forked repository](https://help.github.com/articles/renaming-a-repository/) to something, i.e. `my-forked-project`.

```sh
# Clone it
git clone git@github.com:ebmeds/my-forked-project.git
cd my-forked-project

# Install dependencies
npm install

# Start development live-reload server
npm run dev

# Start production server:
npm start
```

Default operation
------

This starter package defines a simple REST API with the endpoint `/api/facets`, this should of course be replaced.

Since this is a microservice template, we include middleware that creates a Bunyan logging object in `req.logger`. This logger object works like the default logger, with the additional feature that it attaches the field `req_id` to the log messages, for microservice traceability.

Included as a utility is also the file `backoff-request.js`, which defines a HTTP request maker that automatically retries the request on failure, for a specified number of times. This makes calls between microservices more robust.

For slow services, some kind of rate limiting should be implemented so that the request queue does not grow limitlessly. This is not implemented in this package, but rate limiting works great together with `backoff-request.js` mentioned above.

Configuring
------

All available configuration flags are found as environment variables in `.env.defaults`. If you want to change them, create a new `.env` file in the same root directory and redefine the config values there. **Do not commit `.env` to git!**

Note that `.env.defaults` is overridden by `.env` and ultimately by any environment variables that are already defined. In other words, if `LISTEN_PORT` is set to `5000` in the shell (or by the `-e` flag in Docker), the value in `.env.defaults` and `.env` will be ignored.

A rule of thumb is that `.env.defaults` contains sane default values that are usable for production, minus sensitive data like DB passwords. Developers should have a custom `.env` file for their local machine. In practice, the final config tweaks for production is done by Docker environment variables.

Docker Support
------
```sh
cd my-forked-project

# Build your docker
docker build -t my-new-service .
#            ^      ^          ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -e DB_PASSWORD=123 -p 8080:8080 my-new-service
#              ^               ^            ^
#          Custom env     bind the port    container tag
#          variable       to your host
#                         machine port

```

License
-------

MIT
