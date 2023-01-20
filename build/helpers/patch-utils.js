"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEntityKeys = void 0;
var common_1 = require("@nestjs/common");
var validateEntityKeys = function (validKeys, data) {
    if (!validKeys.includes(data.key)) {
        throw new common_1.BadRequestException("Invalid key. Supported keys are the following: ".concat(validKeys.join(', ')));
    }
};
exports.validateEntityKeys = validateEntityKeys;
//# sourceMappingURL=patch-utils.js.map