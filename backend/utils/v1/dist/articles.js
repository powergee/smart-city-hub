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
exports.__esModule = true;
var koa_router_1 = require("koa-router");
var koa_bodyparser_1 = require("koa-bodyparser");
var koa_cookie_1 = require("koa-cookie");
var generalArticleModel_1 = require("./models/generalArticleModel");
var fileModel_1 = require("./models/fileModel");
var validateAuth_1 = require("./validateAuth");
var router = new koa_router_1["default"]();
router.use(koa_bodyparser_1["default"]());
router.use(koa_cookie_1["default"]());
router.get("/", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var body, token, res, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = {
                    kind: ctx.query.kind,
                    page: Number(ctx.query.page),
                    perPage: Number(ctx.query.perPage)
                };
                if (body.page === undefined || body.perPage === undefined || body.kind === undefined ||
                    isNaN(body.page) || isNaN(body.perPage) ||
                    body.page < 1 || body.perPage < 1) {
                    ctx["throw"](400, "At least one parameter is not valid. The query was: " + JSON.stringify(ctx.query));
                }
                token = validateAuth_1["default"](ctx);
                if (!(token !== undefined && token.isManager)) return [3 /*break*/, 2];
                return [4 /*yield*/, generalArticleModel_1.GeneralArticleModel.find()
                        .where("kind").equals(body.kind)
                        .sort({ articleId: -1 })
                        .skip((body.page - 1) * body.perPage)
                        .limit(body.perPage).exec()];
            case 1:
                res = _a.sent();
                ctx.response.body = res;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, generalArticleModel_1.GeneralArticleModel.find()
                    .where("kind").equals(body.kind)
                    .where("isPublic").equals(true)
                    .sort({ articleId: -1 })
                    .skip((body.page - 1) * body.perPage)
                    .limit(body.perPage).exec()];
            case 3:
                res = _a.sent();
                ctx.response.body = res;
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get("/count", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var body, token, count, _a, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                body = ctx.query;
                if (body.kind === undefined) {
                    ctx["throw"](400, "kind is not valid. The body was: " + JSON.stringify(ctx.query));
                }
                token = validateAuth_1["default"](ctx);
                return [4 /*yield*/, generalArticleModel_1.GeneralArticleModel.countDocuments({ kind: body.kind, isPublic: true }).exec()];
            case 1:
                count = _b.sent();
                if (!(token !== undefined && token.isManager)) return [3 /*break*/, 3];
                _a = count;
                return [4 /*yield*/, generalArticleModel_1.GeneralArticleModel.countDocuments({ kind: body.kind, isPublic: false }).exec()];
            case 2:
                count = _a + _b.sent();
                _b.label = 3;
            case 3:
                res = {
                    articleCount: count
                };
                ctx.response.body = res;
                return [2 /*return*/];
        }
    });
}); });
router.get("/:articleId", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var articleId, res, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                articleId = Number(ctx.params.articleId);
                if (articleId === undefined || isNaN(articleId)) {
                    ctx["throw"](400, "articleId is not valid. The parameter was " + JSON.stringify(ctx.params));
                }
                return [4 /*yield*/, generalArticleModel_1.GeneralArticleModel.findOne({ articleId: articleId }).exec()];
            case 1:
                res = _a.sent();
                if (res === null) {
                    ctx["throw"](404, "There's no article with articleId = " + ctx.params.articleId);
                }
                token = validateAuth_1["default"](ctx);
                if ((token === undefined || !token.isManager) && !res.isPublic) {
                    // 글이 비공개 상태인데 manager 권한이 없다면 글을 확인할 수 없다.
                    ctx["throw"](401, "It is unauthorized.");
                }
                else {
                    // 현재 manager 계정으로 로그인 되어 있다면 공개된 게시글은 물론 비공개된 게시글도 확인할 수 있다.
                    // 조회수를 1 증가시킨다.
                    res.views += 1;
                    res.save();
                    ctx.response.body = res;
                }
                return [2 /*return*/];
        }
    });
}); });
router.post("/", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var token, body, newArticle_1, saved_1, prevArticle, saved_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = validateAuth_1["default"](ctx);
                if (token === undefined) {
                    ctx["throw"](401, "It is unauthorized.");
                }
                body = ctx.request.body;
                if (body.contents === undefined || body.files === undefined || body.title === undefined ||
                    body.images === undefined || body.kind === undefined || body.isPublic === undefined) {
                    ctx["throw"](400, "At least one parameter is not valid. The body was: " + JSON.stringify(ctx.request.body));
                }
                body.files.forEach(function (element) {
                    if (element === undefined) {
                        ctx["throw"](400, "At least one file number is not valid. The body was: " + JSON.stringify(ctx.request.body));
                    }
                });
                body.images.forEach(function (element) {
                    if (element === undefined) {
                        ctx["throw"](400, "At least one image number is not valid. The body was: " + JSON.stringify(ctx.request.body));
                    }
                });
                if (!(body.articleId === undefined)) return [3 /*break*/, 2];
                newArticle_1 = new generalArticleModel_1.GeneralArticleModel();
                body.files.forEach(function (element) {
                    newArticle_1.files.push(element);
                });
                body.images.forEach(function (element) {
                    newArticle_1.images.push(element);
                });
                newArticle_1.title = body.title;
                newArticle_1.contents = body.contents;
                newArticle_1.kind = body.kind;
                newArticle_1.isPublic = body.isPublic;
                newArticle_1.views = 0;
                newArticle_1.createdBy = token.userName;
                newArticle_1.lastModifiedBy = "";
                return [4 /*yield*/, newArticle_1.save()];
            case 1:
                saved_1 = _a.sent();
                saved_1.files.forEach(function (element) {
                    fileModel_1.FileModel.findOneAndUpdate({ fileId: element }, { parentArticleId: saved_1.articleId });
                });
                saved_1.images.forEach(function (element) {
                    fileModel_1.FileModel.findOneAndUpdate({ fileId: element }, { parentArticleId: saved_1.articleId });
                });
                ctx.response.body = saved_1;
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, generalArticleModel_1.GeneralArticleModel.findOne({ articleId: body.articleId }).exec()];
            case 3:
                prevArticle = _a.sent();
                if (prevArticle === null) {
                    ctx["throw"](404, "There's no article with articleId = " + body.articleId);
                }
                prevArticle.files = body.files;
                prevArticle.images = body.images;
                prevArticle.title = body.title;
                prevArticle.contents = body.contents;
                prevArticle.kind = body.kind;
                prevArticle.isPublic = body.isPublic;
                prevArticle.lastModifiedBy = token.userName;
                prevArticle.meta.modifiedAt = new Date();
                return [4 /*yield*/, prevArticle.save()];
            case 4:
                saved_2 = _a.sent();
                saved_2.files.forEach(function (element) {
                    fileModel_1.FileModel.findOneAndUpdate({ fileId: element }, { parentArticleId: saved_2.articleId });
                });
                saved_2.images.forEach(function (element) {
                    fileModel_1.FileModel.findOneAndUpdate({ fileId: element }, { parentArticleId: saved_2.articleId });
                });
                ctx.response.body = saved_2;
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
router["delete"]("/:articleId", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var token, existing;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = validateAuth_1["default"](ctx);
                if (token === undefined) {
                    ctx["throw"](401, "It is unauthorized.");
                }
                if (isNaN(Number(ctx.params.articleId))) {
                    ctx["throw"](400, "articleId must be a number.");
                }
                return [4 /*yield*/, generalArticleModel_1.GeneralArticleModel.findOne({ articleId: Number(ctx.params.articleId) }).exec()];
            case 1:
                existing = _a.sent();
                if (existing === null) {
                    ctx["throw"](404, "There's no article with articleId = " + ctx.params.articleId);
                }
                generalArticleModel_1.GeneralArticleModel.deleteOne({ articleId: Number(ctx.params.articleId) }).exec();
                ctx.response.status = 200;
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;
