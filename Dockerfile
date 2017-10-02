FROM mhart/alpine-node:8

# File Author / Maintainer
LABEL authors="Ville Lindholm <ville.lindholm@duodecim.fi>"

# Install app dependencies
COPY package.json /app/package.json
RUN cd /app; npm install

# Copy app source
COPY ./src /app

# Set work directory to /app
WORKDIR /app

# expose the port to outside world (this is probably overriden in the Swarm)
EXPOSE  8080

# start command as per package.json
CMD ["npm", "start"]
