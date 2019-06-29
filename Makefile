init:
	npm install

xml-to-json:
	node_modules/.bin/tsc ./src/*.ts --outDir ./dist --moduleResolution Node && npm run convert data/nasa.xml