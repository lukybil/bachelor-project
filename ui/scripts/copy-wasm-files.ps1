Copy-Item -Path "../wasm/maze-generation/pkg/*" -Destination "./src/features/mazeGeneration/wasm/"
Copy-Item -Path "../wasm/resize-image/pkg/*" -Destination "./src/features/imageResize/wasm/"
Copy-Item -Path "../wasm/json-csv/pkg/*" -Destination "./src/features/jsonToCsv/wasm/"