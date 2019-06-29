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
var _this = this;
exports.__esModule = true;
var saxes_1 = require("saxes");
function parseXml(xml) {
    return new Promise(function (res, rej) {
        var _root = null, _path = null, _id = 0;
        var parser = new saxes_1.SaxesParser({ position: true });
        parser.onerror = function (e) { return console.error(e); };
        parser.onclosetag = function () { return _path.pop(); };
        parser.onend = function () { return res(_root); };
        parser.ontext = function (t) {
            if (!_path || !_path.length)
                return;
            _path[_path.length - 1].value += t;
        };
        parser.onopentag = function (node) {
            try {
                var name_1 = node.name, attributes = node.attributes;
                var el = {
                    id: ++_id,
                    name: name_1,
                    children: [],
                    value: '',
                    attributes: []
                };
                for (var _i = 0, _a = Object.keys(attributes); _i < _a.length; _i++) {
                    var key = _a[_i];
                    el.attributes.push({ name: key, value: attributes[key] });
                }
                if (!_root) {
                    _root = el;
                    _path = [_root];
                }
                else {
                    _path[_path.length - 1].children.push(el);
                    _path.push(el);
                }
            }
            catch (err) {
                rej(new Error("Error in " + parser.line + ":" + parser.column + ":" + parser.position + ": " + err));
            }
        };
        parser.write(xml).close();
    });
}
function toJson(root) {
    var traverse = function (src) {
        var isSingle = !src.children || !src.children.length;
        var hasAttrs = src.attributes && src.attributes.length;
        if (isSingle && !hasAttrs) {
            return src.value;
        }
        var objResult = {};
        if (hasAttrs) {
            var attrs = src.attributes;
            for (var i = attrs.length - 1; i >= 0; i--) {
                var propName = attrs[i].name;
                objResult[propName] = attrs[i].value;
            }
        }
        if (isSingle) {
            objResult.value = src.value;
            return objResult;
        }
        var _loop_1 = function (child) {
            var name_2 = child.name;
            if (name_2 in objResult) {
                return "continue";
            }
            var siblings = src.children.filter(function (eachChild) { return eachChild.id !== child.id && eachChild.name === name_2; });
            var childResult = traverse(child);
            objResult[name_2] = (siblings.length) ? [childResult].concat(siblings.map(function (sibling) { return traverse(sibling); })) : childResult;
        };
        for (var _i = 0, _a = src.children; _i < _a.length; _i++) {
            var child = _a[_i];
            _loop_1(child);
        }
        return objResult;
    };
    return traverse(root);
}
exports["default"] = (function (xml) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0:
            _a = toJson;
            return [4 /*yield*/, parseXml(xml)];
        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
    }
}); }); });
