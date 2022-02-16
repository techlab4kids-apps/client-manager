<h3>Electron + React + Express + Typescript Bundle</h3>

This is a TypeScript boilerplate for creating an Electron app using React with react-router and an Express server.

It's very basic but functional, so you can start creating your app as soon as possible without worrying too much about configuration.

<h3>Installation</h3>

```
npm install
```

You need to build the project, so the server can start when developing.

```
npm build
```

Now you can start the project on development mode, this will start electron opening the app and starting the server.
```
npm run dev
```

<h3>Building for production</h3>

Check in the package.json under `config` the platforms' target for your app build and the name for it, then run:

```
npm run package
```

```
npm run make
```
