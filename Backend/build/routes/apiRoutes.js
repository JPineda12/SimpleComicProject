"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var apiController_1 = require("../controllers/apiController");
var ApiRoutes = /** @class */ (function () {
    function ApiRoutes() {
        this.router = express_1.Router();
        this.config();
    }
    ApiRoutes.prototype.config = function () {
        this.router.post('/login', apiController_1.apiController.loginUser);
        this.router.post('/register', apiController_1.apiController.postUser);
        this.router.post('/postComic', apiController_1.apiController.postComic);
        this.router.get('/comics', apiController_1.apiController.getComics);
        this.router.get('/editoriales', apiController_1.apiController.getEditoriales);
        this.router.put('/updateComic', apiController_1.apiController.updateComic);
        this.router.delete('/deleteComic/:idComic', apiController_1.apiController.deleteComic);
    };
    return ApiRoutes;
}());
var apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
