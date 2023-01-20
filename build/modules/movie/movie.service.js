"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.MovieService = void 0;
var typeorm_1 = require("@nestjs/typeorm");
var common_1 = require("@nestjs/common");
var typeorm_2 = require("typeorm");
var movie_1 = require("../../entity/movie");
var uuid_1 = require("uuid");
var constants_1 = require("../../constants");
var patch_utils_1 = require("../../helpers/patch-utils");
var MovieService = /** @class */ (function () {
    function MovieService(movieRepository) {
        this.movieRepository = movieRepository;
    }
    MovieService.prototype.findMovie = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var movie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.movieRepository.findOneBy({ id: id })];
                    case 1:
                        movie = _a.sent();
                        return [2 /*return*/, movie];
                }
            });
        });
    };
    MovieService.prototype.findMovies = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var pageNumber, pageSize, movieQueryBuilder, _a, movies, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pageNumber = props.pageNumber ? props.pageNumber : 1;
                        pageSize = props.pageSize ? props.pageSize : constants_1.PAGE_SIZE;
                        return [4 /*yield*/, this.movieRepository
                                .createQueryBuilder('movie')];
                    case 1:
                        movieQueryBuilder = _b.sent();
                        if (props.title) {
                            movieQueryBuilder.where('movie.title ilike :title', { title: "%".concat(props.title, "%") });
                        }
                        if (props.groupName) {
                            movieQueryBuilder.andWhere('movie.groupName ilike :groupName', { groupName: "%".concat(props.groupName, "%") });
                        }
                        if (props.author) {
                            movieQueryBuilder.andWhere('movie.author ilike :author', { author: "%".concat(props.author, "%") });
                        }
                        if (props.producer) {
                            movieQueryBuilder.andWhere('movie.producer ilike :producer', { producer: "%".concat(props.producer, "%") });
                        }
                        if (pageNumber) {
                            movieQueryBuilder
                                .skip((pageNumber - 1) * pageSize)
                                .take(pageNumber * pageSize);
                        }
                        return [4 /*yield*/, movieQueryBuilder.getManyAndCount()];
                    case 2:
                        _a = _b.sent(), movies = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                data: movies,
                                total: total
                            }];
                }
            });
        });
    };
    MovieService.prototype.createMovie = function (movie) {
        return __awaiter(this, void 0, void 0, function () {
            var newMovie, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        newMovie = this.movieRepository.create(movie);
                        newMovie.id = (0, uuid_1.v4)();
                        newMovie.createdAt = new Date();
                        newMovie.updatedAt = newMovie.createdAt;
                        if (movie.franchiseId && movie.franchiseId.length > 0) {
                            newMovie.franchiseId = movie.franchiseId;
                        }
                        return [4 /*yield*/, this.movieRepository.save(newMovie)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, newMovie];
                    case 2:
                        _a = _b.sent();
                        throw new common_1.BadRequestException();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MovieService.prototype.updateMovie = function (id, propsToBeUpdated) {
        return __awaiter(this, void 0, void 0, function () {
            var movie_2, movieProps, changedProps_1, newMovie_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.findMovie(id)];
                    case 1:
                        movie_2 = _b.sent();
                        if (!(movie_2 && propsToBeUpdated)) return [3 /*break*/, 3];
                        movieProps = Object.keys(propsToBeUpdated);
                        changedProps_1 = {};
                        newMovie_1 = movie_2;
                        movieProps.forEach(function (movieProp) {
                            if (propsToBeUpdated[movieProp] !== movie_2[movieProp]) {
                                changedProps_1[movieProp] = propsToBeUpdated[movieProp];
                                newMovie_1[movieProp] = propsToBeUpdated[movieProp];
                            }
                        });
                        if (!(Object.keys(changedProps_1).length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.movieRepository.save(newMovie_1)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, newMovie_1];
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        _a = _b.sent();
                        throw new common_1.BadRequestException();
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MovieService.prototype.patchMovie = function (id, dto) {
        return __awaiter(this, void 0, void 0, function () {
            var movie, validKeys;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.findMovie(id)];
                    case 1:
                        movie = _c.sent();
                        validKeys = ['title', 'groupName', 'author', 'producer', 'releaseDate', 'logoUrl'];
                        (0, patch_utils_1.validateEntityKeys)(validKeys, dto);
                        if (movie && movie[dto.key] !== dto.value) {
                            this.movieRepository.update(id, (_a = {},
                                _a[dto.key] = dto.value,
                                _a));
                            return [2 /*return*/, __assign(__assign({}, movie), (_b = {}, _b[dto.key] = dto.value, _b))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MovieService.prototype.deleteMovie = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.movieRepository.delete({ id: id });
                return [2 /*return*/];
            });
        });
    };
    MovieService = __decorate([
        __param(0, (0, typeorm_1.InjectRepository)(movie_1.Movie)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], MovieService);
    return MovieService;
}());
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map