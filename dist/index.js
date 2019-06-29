"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var xmlToJsonConverter_1 = require("./xmlToJsonConverter");
var path_1 = require("path");
/**Convert XML to JSON via stream pipeline */
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var start, xmlFilename, xml, xmlKb, jsonRaw, stats, jsonText, jsonKb, elapsed, jsonFilename;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = (Date.now() / 1000);
                    xmlFilename = process.argv[2];
                    xml = fs_1.readFileSync(xmlFilename);
                    xmlKb = Math.ceil((Buffer.byteLength(xml, "utf8") / 1024));
                    return [4 /*yield*/, xmlToJsonConverter_1["default"](xml)];
                case 1:
                    jsonRaw = _a.sent();
                    stats = process.memoryUsage();
                    jsonText = JSON.stringify(jsonRaw, null, ' ');
                    jsonKb = Math.ceil((Buffer.byteLength(jsonText, "utf8") / 1024));
                    elapsed = Math.ceil((Date.now() / 1000) - start);
                    console.log("Converted Xml (" + xmlKb + "kb) to Json (" + jsonKb + "kb) in " + elapsed + " sec.");
                    console.log("Heap used: " + Math.ceil(stats.heapUsed / 1024 / 1024) + "mb");
                    console.log("Heap total: " + Math.ceil(stats.heapTotal / 1024 / 1024) + "mb");
                    jsonFilename = path_1.join(path_1.dirname(xmlFilename), path_1.basename(xmlFilename, '.xml') + '.json');
                    fs_1.writeFileSync(jsonFilename, jsonText);
                    return [2 /*return*/];
            }
        });
    });
})();
