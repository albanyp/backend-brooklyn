"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieFranchiseService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var movie_franchise_1 = require("../../entity/movie-franchise");
var uuid_1 = require("uuid");
var constants_1 = require("../../constants");
var MovieFranchiseService = /** @class */ (function () {
    function MovieFranchiseService(movieFranchiseRepository) {
        this.movieFranchiseRepository = movieFranchiseRepository;
    }
    MovieFranchiseService.prototype.findFranchises = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var page, size, name, queryBuilder, _a, franchise, total, franchises;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        page = params && params.pageNumber ? params.pageNumber : null;
                        size = params && params.pageSize ? params.pageSize : constants_1.PAGE_SIZE;
                        name = params && params.name ? params.name : null;
                        if (!page) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.movieFranchiseRepository
                                .createQueryBuilder('movieFranchise')
                                .skip((page - 1) * size)
                                .take(size * page)];
                    case 1:
                        queryBuilder = _b.sent();
                        if (name) {
                            queryBuilder.where('movieFranchise.name ilike :franchiseName', { franchiseName: "%".concat(name, "%") });
                        }
                        return [4 /*yield*/, queryBuilder.getManyAndCount()];
                    case 2:
                        _a = _b.sent(), franchise = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                data: franchise,
                                total: total
                            }];
                    case 3: return [4 /*yield*/, this.movieFranchiseRepository.find()];
                    case 4:
                        franchises = _b.sent();
                        return [2 /*return*/, {
                                data: franchises,
                                total: franchises.length
                            }];
                }
            });
        });
    };
    MovieFranchiseService.prototype.findFranchise = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var franchise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.movieFranchiseRepository.findOneBy({ id: param })];
                    case 1:
                        franchise = _a.sent();
                        return [2 /*return*/, franchise];
                }
            });
        });
    };
    MovieFranchiseService.prototype.createFranchise = function (movieFranchise) {
        return __awaiter(this, void 0, void 0, function () {
            var newMovieFranchise, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        newMovieFranchise = this.movieFranchiseRepository.create(movieFranchise);
                        newMovieFranchise.id = (0, uuid_1.v4)();
                        newMovieFranchise.createdAt = new Date();
                        newMovieFranchise.updatedAt = newMovieFranchise.createdAt;
                        return [4 /*yield*/, this.movieFranchiseRepository.save(newMovieFranchise)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, newMovieFranchise];
                    case 2:
                        _a = _b.sent();
                        throw new common_1.BadRequestException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MovieFranchiseService.prototype.updateFranchise = function (id, dto) {
        return __awaiter(this, void 0, void 0, function () {
            var franchiseToBeUpdated, contentToBeUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(dto && dto.name)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.findFranchise(id)];
                    case 1:
                        franchiseToBeUpdated = _a.sent();
                        if (franchiseToBeUpdated && franchiseToBeUpdated.name !== dto.name) {
                            contentToBeUpdated = dto;
                            contentToBeUpdated.updatedAt = new Date();
                            this.movieFranchiseRepository.update(id, contentToBeUpdated);
                        }
                        else {
                            throw new common_1.BadRequestException("Franchise can't be updated");
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    MovieFranchiseService.prototype.deleteFranchise = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.movieFranchiseRepository.delete(id);
                return [2 /*return*/];
            });
        });
    };
    MovieFranchiseService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(movie_franchise_1.MovieFranchise)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], MovieFranchiseService);
    return MovieFranchiseService;
}());
exports.MovieFranchiseService = MovieFranchiseService;
//# sourceMappingURL=movie-franchise.service.js.map