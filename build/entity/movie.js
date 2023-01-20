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
exports.Movie = void 0;
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var Movie = /** @class */ (function () {
    function Movie() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({
            default: function () { return (0, uuid_1.v4)(); }
        }),
        __metadata("design:type", String)
    ], Movie.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Movie.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: 'release_date',
            nullable: true
        }),
        __metadata("design:type", Date)
    ], Movie.prototype, "releaseDate", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: 'group_name',
            nullable: true
        }),
        __metadata("design:type", String)
    ], Movie.prototype, "groupName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Movie.prototype, "position", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Movie.prototype, "author", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: true
        }),
        __metadata("design:type", String)
    ], Movie.prototype, "producer", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: 'logo_url',
            nullable: true
        }),
        __metadata("design:type", String)
    ], Movie.prototype, "logoUrl", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: 'movie_franchise_id',
            nullable: true
        }),
        __metadata("design:type", String)
    ], Movie.prototype, "franchiseId", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: 'movie_type_id',
            nullable: false
        }),
        __metadata("design:type", String)
    ], Movie.prototype, "typeId", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: 'created_at',
            nullable: true
        }),
        __metadata("design:type", Date)
    ], Movie.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            name: 'updated_at',
            nullable: true
        }),
        __metadata("design:type", Date)
    ], Movie.prototype, "updatedAt", void 0);
    Movie = __decorate([
        (0, typeorm_1.Entity)()
    ], Movie);
    return Movie;
}());
exports.Movie = Movie;
//# sourceMappingURL=movie.js.map