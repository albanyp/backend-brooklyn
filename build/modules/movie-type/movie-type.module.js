"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieTypeModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var movie_type_1 = require("../../entity/movie-type");
var movie_type_controller_1 = require("./movie-type.controller");
var movie_type_service_1 = require("./movie-type.service");
var MovieTypeModule = /** @class */ (function () {
    function MovieTypeModule() {
    }
    MovieTypeModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([movie_type_1.MovieType])],
            controllers: [movie_type_controller_1.MovieTypeController],
            providers: [movie_type_service_1.MovieTypeService]
        })
    ], MovieTypeModule);
    return MovieTypeModule;
}());
exports.MovieTypeModule = MovieTypeModule;
//# sourceMappingURL=movie-type.module.js.map