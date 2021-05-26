"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiController = void 0;
var database_1 = __importDefault(require("../database"));
var ApiController = /** @class */ (function () {
    function ApiController() {
    }
    ApiController.prototype.getEditoriales = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT idEditorial, nombre, imagen FROM Editorial";
                        return [4 /*yield*/, database_1.default.query(sql)];
                    case 1:
                        result = _a.sent();
                        res.json(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.getComics = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "SELECT c.idComic, c.nombre, c.year_impresion, c.sinopsis, e.nombre as Editorial, e.imagen as imagen, u.nickname as Usuario, u.idUsuario as idUsuario "
                            + " FROM Comic c, Editorial e, Usuario u"
                            + " WHERE c.Editorial_idEditorial = e.idEditorial"
                            + " AND c.Usuario_idUsuario =  u.idUsuario";
                        return [4 /*yield*/, database_1.default.query(sql)];
                    case 1:
                        result = _a.sent();
                        res.json(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.loginUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, user, pass, sql, result, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, user = _a.user, pass = _a.pass;
                        sql = "SELECT idUsuario, nickname, nombre FROM Usuario"
                            + " WHERE nickname = ?"
                            + " AND pass = ?";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [user, pass])];
                    case 2:
                        result = _b.sent();
                        res.json(result);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        res.json("Error - Consulta incorrecta");
                        console.log("ERROR: " + err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.deleteComic = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idComic, sql, result, resultado, resultado, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idComic = req.params.idComic;
                        console.log("idComic: " + idComic);
                        sql = "DELETE FROM Comic WHERE idComic = ?";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [idComic])];
                    case 2:
                        result = _a.sent();
                        if (result.affectedRows > 0) {
                            resultado = {
                                deleted: "true"
                            };
                            res.json(resultado);
                        }
                        else {
                            resultado = {
                                deleted: "false"
                            };
                            res.json(resultado);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        res.json("Error - Consulta incorrecta");
                        console.log("ERROR: " + err_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.updateComic = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nombre, year, sinopsis, idEditorial, idComic, sql, result, resultado, resultado, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, nombre = _a.nombre, year = _a.year, sinopsis = _a.sinopsis, idEditorial = _a.idEditorial, idComic = _a.idComic;
                        sql = "UPDATE Comic"
                            + " SET nombre = ?, year_impresion = ?, sinopsis = ?,  Editorial_idEditorial = ?"
                            + " WHERE idComic = ?";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [nombre, year, sinopsis, idEditorial, idComic])];
                    case 2:
                        result = _b.sent();
                        if (result.affectedRows > 0) {
                            resultado = {
                                actualizado: "true"
                            };
                            res.json(resultado);
                        }
                        else {
                            resultado = {
                                actualizado: "false"
                            };
                            res.json(resultado);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _b.sent();
                        res.json("Error - Consulta incorrecta");
                        console.log("ERROR: " + err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.postComic = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nombre, year, sinopsis, idEditorial, idUser, sql, result, resultado, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, nombre = _a.nombre, year = _a.year, sinopsis = _a.sinopsis, idEditorial = _a.idEditorial, idUser = _a.idUser;
                        sql = "INSERT INTO Comic(nombre, year_impresion, sinopsis, Editorial_idEditorial, Usuario_idUsuario)"
                            + " VALUES (?, ?, ?, ?, ?)";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [nombre, year, sinopsis, idEditorial, idUser])];
                    case 2:
                        result = _b.sent();
                        resultado = {
                            post: "true"
                        };
                        res.json(resultado);
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _b.sent();
                        res.json("Error - Consulta incorrecta");
                        console.log("ERROR: " + err_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ApiController.prototype.postUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nombre, nickname, pass, fecha, sexo, sql, result, resultado, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, nombre = _a.nombre, nickname = _a.nickname, pass = _a.pass, fecha = _a.fecha, sexo = _a.sexo;
                        sql = "INSERT INTO Usuario(nombre, nickname, pass, fecha_nacimiento, sexo)"
                            + " VALUES (?, ?, ?, ?, ?)";
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, database_1.default.query(sql, [nombre, nickname, pass, fecha, sexo])];
                    case 2:
                        result = _b.sent();
                        resultado = {
                            post: "true"
                        };
                        res.json(resultado);
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _b.sent();
                        res.json("Error - Consulta incorrecta");
                        console.log("ERROR: " + err_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ApiController;
}());
exports.apiController = new ApiController();
