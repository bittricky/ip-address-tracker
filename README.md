# IP Address Tracker

> Simple application to get the geolocation of an IP Address

### Prerequisites

Ensure you have the following installed on your system

- Node.js: ver. 14.x or newer
- npm(Node Package Manager) or Yarn

Once you have these system dependencies installed, run the following to install the necessary packages.

```
$ npm install
```

or

```
$ yarn install
```

### Environment configuration

The application utilizes [geo.ipify.org](https://geo.ipify.org/) API to geolocate the location from the ip address. You will need to have an API key from the service to make successful request.

Once you have acquired an API key for geo.ipify.org add a `.env` file to the root of the project directory.

```
IPIFY_API_KEY=<IPIFY_API_KEY>
```

### Development

Run the development server:

```
$ npm run dev
```

or

```
$ yarn dev
```

This will start the server on [port 3000](https://localhost:3000). Open this url in your browser to view the application.

### Production

To create a production build of the application:

```
$ npm run build
```

or

```
$ yarn build
```

After the build completes, you can start the production server by running:

```
$ npm start
```

or

```
$ yarn start
```
