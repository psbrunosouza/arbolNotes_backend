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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
const tsyringe_1 = require("tsyringe");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
const UserRepository_1 = require("../infra/typeorm/repositories/UserRepository");
const bcrypt_1 = require("bcrypt");
const auth_1 = __importDefault(require("../../../config/auth"));
let AuthUserService = class AuthUserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ email, password, }) {
        const authConfig = (0, auth_1.default)();
        const user = await this.userRepository.findUserByEmail(email);
        if (!user)
            throw new AppError_1.default('Invalid email or password, check your credentials', 401);
        if (!(await (0, bcrypt_1.compare)(password, user.password)))
            throw new AppError_1.default('Invalid email or password, check your credentials', 401);
        const payload = {
            userId: user.id,
            name: user.name,
        };
        const token = jsonwebtoken_1.default.sign(payload, String(authConfig.SECRET), {
            expiresIn: authConfig.EXPIRES_IN,
        });
        return { token };
    }
};
AuthUserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(UserRepository_1.UserRepository)),
    __metadata("design:paramtypes", [Object])
], AuthUserService);
exports.AuthUserService = AuthUserService;
