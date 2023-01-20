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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var config_1 = require("@nestjs/config");
var typeorm_2 = require("typeorm");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./modules/auth/auth.module");
var data_source_1 = require("./data-source");
var users_module_1 = require("./modules/users/users.module");
var movie_type_module_1 = require("./modules/movie-type/movie-type.module");
var movie_franchise_module_1 = require("./modules/movie-franchise/movie-franchise.module");
var movie_module_1 = require("./modules/movie/movie.module");
var AppModule = /** @class */ (function () {
    function AppModule(dataSource) {
        this.dataSource = dataSource;
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRoot(data_source_1.dbConfig),
                config_1.ConfigModule.forRoot(),
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                movie_module_1.MovieModule,
                movie_franchise_module_1.MovieFranchiseModule,
                movie_type_module_1.MovieTypeModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        }),
        __metadata("design:paramtypes", [typeorm_2.DataSource])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map