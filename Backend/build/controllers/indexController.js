"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, res) {
        res.json({ text: 'Api is at /api' });
    };
    return IndexController;
}());
exports.indexController = new IndexController();
