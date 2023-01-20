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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.dbConfig = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var movie_1 = require("./entity/movie");
var movie_franchise_1 = require("./entity/movie-franchise");
var movie_type_1 = require("./entity/movie-type");
var user_1 = require("./entity/user");
exports.dbConfig = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "masterkey",
    database: "brooklyn",
    synchronize: false,
    logging: false,
    entities: [user_1.User, movie_1.Movie, movie_type_1.MovieType, movie_franchise_1.MovieFranchise],
    subscribers: [],
};
exports.AppDataSource = new typeorm_1.DataSource(__assign(__assign({}, exports.dbConfig), { migrations: ['./src/migration/*.ts'] }));
//# sourceMappingURL=data-source.js.map