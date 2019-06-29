import {readFileSync, writeFileSync} from 'fs';
import xmlToJsonConverter from './xmlToJsonConverter';
import {join, dirname, basename} from 'path';

/**Convert XML to JSON via stream pipeline */
(async function(){
    const start = (Date.now() / 1000);
    const xmlFilename = process.argv[2];

    const xml = readFileSync(xmlFilename)
    const xmlKb = Math.ceil((Buffer.byteLength(xml, "utf8") / 1024));

    const jsonRaw = await xmlToJsonConverter(xml);
    const stats = process.memoryUsage()
    const jsonText = JSON.stringify(jsonRaw, null, ' ');

    const jsonKb = Math.ceil((Buffer.byteLength(jsonText, "utf8") / 1024));
    const elapsed = Math.ceil((Date.now() / 1000) - start);
  
    console.log(`Converted Xml (${xmlKb}kb) to Json (${jsonKb}kb) in ${elapsed} sec.`)
    console.log(`Heap used: ${Math.ceil(stats.heapUsed / 1024 / 1024)}mb`)
    console.log(`Heap total: ${Math.ceil(stats.heapTotal / 1024 / 1024)}mb`)

    const jsonFilename = join(dirname(xmlFilename), basename(xmlFilename, '.xml') + '.json');
    writeFileSync(jsonFilename, jsonText);
})();