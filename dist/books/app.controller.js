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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const book_dto_1 = require("./dto/book.dto");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getBooks() {
        return await this.appService.getBooks();
    }
    async getBooksById(id) {
        const books = await this.appService.getBooksById(id);
        if (!books) {
            throw new common_1.NotFoundException('Book not found');
        }
        return await this.appService.getBooksById(books.id);
    }
    async getBooksFiltered(id, title, author) {
        if (id && !(0, class_validator_1.isUUID)(id)) {
            throw new common_1.BadRequestException('ID is invalid. Must be a valid UUID.');
        }
        const books = this.appService.getBooksFiltered(id, title, author);
        if (!books || (await books).length == 0) {
            throw new common_1.NotFoundException('Book not found');
        }
        return books;
    }
    async createBooks(data) {
        return await this.appService.createBook(data);
    }
    async updateBooks(data, id) {
        const books = await this.appService.getBooksById(id);
        if (!books) {
            throw new common_1.NotFoundException('Book not found');
        }
        return await this.appService.updateBooks(data, books.id);
    }
    async deleteBooks(id) {
        const books = await this.appService.getBooksById(id);
        if (!books) {
            throw new common_1.NotFoundException('Book not found');
        }
        return await this.appService.deleteBooks(books.id);
    }
    async borrowBooks(id) {
        const books = await this.appService.getBooksById(id);
        if (!books) {
            throw new common_1.NotFoundException('Book not found');
        }
        return await this.appService.borrowBooks(books.id);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('get-books'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBooks", null);
__decorate([
    (0, common_1.Get)('get-books-id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBooksById", null);
__decorate([
    (0, swagger_1.ApiQuery)({
        name: "id",
        type: String,
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        name: "title",
        type: String,
        required: false
    }),
    (0, swagger_1.ApiQuery)({
        name: "author",
        type: String,
        required: false
    }),
    (0, common_1.Get)('get-books-filtered'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('title')),
    __param(2, (0, common_1.Query)('author')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBooksFiltered", null);
__decorate([
    (0, common_1.Post)('create-books'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.BookDTO]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createBooks", null);
__decorate([
    (0, common_1.Patch)('update-books'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_dto_1.BookDTO, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateBooks", null);
__decorate([
    (0, common_1.Delete)('delete-books'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteBooks", null);
__decorate([
    (0, common_1.Patch)('borrow-books'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "borrowBooks", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map