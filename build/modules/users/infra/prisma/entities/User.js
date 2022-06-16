"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Default_1 = require("../../../../../shared/infra/prisma/entities/Default");
const uuid_1 = require("uuid");
class User extends Default_1.Default {
    constructor() {
        super();
        this.id = (0, uuid_1.v4)();
    }
}
exports.User = User;