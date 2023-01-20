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
exports.UsersService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_2 = require("typeorm");
var user_1 = require("../../entity/user");
var find_users_params_dto_1 = require("./dtos/find-users-params.dto");
var constants_1 = require("../../constants");
var patch_utils_1 = require("../../helpers/patch-utils");
var UsersService = /** @class */ (function () {
    function UsersService(userRepository) {
        this.userRepository = userRepository;
    }
    UsersService.prototype.findUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOneBy({ id: id })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UsersService.prototype.findUsers = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var page, size, queryBuilder, _a, users, total, users;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        page = (params === null || params === void 0 ? void 0 : params.pageNumber) || null;
                        size = (params === null || params === void 0 ? void 0 : params.pageSize) || constants_1.PAGE_SIZE;
                        if (!page) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userRepository
                                .createQueryBuilder('user')
                                .skip((page - 1) * size)
                                .take(page * size)];
                    case 1:
                        queryBuilder = _b.sent();
                        if (params.firstName) {
                            queryBuilder.where('user.firstName ilike :firstName', { firstName: "%".concat(params.firstName, "%") });
                        }
                        if (params.lastName) {
                            queryBuilder.andWhere('user.lastName ilike :lastName', { lastName: "%".concat(params.lastName, "%") });
                        }
                        if (params.email) {
                            queryBuilder.andWhere('user.email ilike :email', { email: "%".concat(params.email, "%") });
                        }
                        if (params.nickname) {
                            queryBuilder.andWhere('user.nickname ilike :nickname', { nickname: "%".concat(params.nickname, "%") });
                        }
                        return [4 /*yield*/, queryBuilder.getManyAndCount()];
                    case 2:
                        _a = _b.sent(), users = _a[0], total = _a[1];
                        return [2 /*return*/, {
                                data: users,
                                total: total
                            }];
                    case 3: return [4 /*yield*/, this.userRepository.find()];
                    case 4:
                        users = _b.sent();
                        return [2 /*return*/, {
                                data: users,
                                total: users.length
                            }];
                }
            });
        });
    };
    UsersService.prototype.updateUser = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, newUser, newUserData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findUser(id)];
                    case 1:
                        user = _a.sent();
                        newUser = user;
                        if (user) {
                            newUserData = Object.keys(data);
                            newUserData.forEach(function (item) {
                                if (data[item] !== user[item]) {
                                    newUser[item] = data[item];
                                }
                            });
                            this.userRepository.save(newUser);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UsersService.prototype.patchUser = function (id, dto) {
        return __awaiter(this, void 0, void 0, function () {
            var validKeys, userToPatch;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        validKeys = ['firstName', 'lastName', 'email', 'birthdate', 'nickname', 'logoUrl'];
                        (0, patch_utils_1.validateEntityKeys)(validKeys, dto);
                        return [4 /*yield*/, this.findUser(id)];
                    case 1:
                        userToPatch = _c.sent();
                        if (userToPatch && userToPatch[dto.key] !== dto.value) {
                            this.userRepository.update(id, (_a = {},
                                _a[dto.key] = dto.value,
                                _a));
                            return [2 /*return*/, __assign(__assign({}, userToPatch), (_b = {}, _b[dto.key] = dto.value, _b))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        __param(0, (0, common_1.Query)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [find_users_params_dto_1.FindUsersParamsDto]),
        __metadata("design:returntype", Promise)
    ], UsersService.prototype, "findUsers", null);
    UsersService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(user_1.User)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map