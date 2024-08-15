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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../shared/prisma.service");
let AppService = class AppService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createBook(data) {
        return this.prismaService.book.create({ data });
    }
    async getBooks() {
        return await this.prismaService.book.findMany();
    }
    async getBooksById(id) {
        return this.prismaService.book.findFirst({ where: { id } });
    }
    async getBooksFiltered(id, title, author) {
        if (id) {
            return this.prismaService.book.findMany({
                where: {
                    id
                }
            });
        }
        else if (title) {
            return this.prismaService.book.findMany({
                where: {
                    title
                }
            });
        }
        else if (author) {
            return this.prismaService.book.findMany({
                where: {
                    author
                }
            });
        }
    }
    async updateBooks(data, id) {
        return await this.prismaService.book.update({ data, where: { id } });
    }
    async borrowBooks(id) {
        const book = this.prismaService.book.findFirst({
            where: { id }
        });
        return this.prismaService.book.update({ data: { quantity: (await book).quantity - 1 }, where: { id } });
    }
    async deleteBooks(idBook) {
        await this.prismaService.book.delete({
            where: {
                id: idBook
            }
        });
        return 'Book deleted successfully';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
//# sourceMappingURL=app.service.js.map