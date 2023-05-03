### Starting the project
1. install dependencies have to be installed using `npm install`
2. start the back-end by changing to the `api` directory and executing `npm start`
3. start the front-end by changing to the `ui` directory and executing `npm start`

### Compiling to Wasm
In the `ui` directory, there are npm scripts that compile the Rust files into Wasm. They can be found in the `ui/package.json` file.

### Running E2E tests
Comment in or out the necessary tests in the `ui/e2e/src/e2e/app.cy.ts` file. In the `ui` directory run `npm run e2e-headed`.

### JSON to CSV
Testing data can be generated by changing to `api` directory and executing `npm run generate-data`. The amount of objects that will be generated can be set in the `api/data/generateData.ts` file.