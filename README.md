# OASIS UI components library

## Usage
Install node module from nexus repository with `npm i oasis-ui`

After installation you can import components `import { Input } from 'oasis-ui'`

## Development

After cloning repo install dependencies and peerDependencies:
```
npm ci
npm run install-peers
```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the storybook in the development mode.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

The page will reload if you make edits.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run coverage`

Launches the test and builds the coverage report to the `coverage` folder.

### `npm run build:npm`

Builds the component library for install or publish to the `lib` folder.
