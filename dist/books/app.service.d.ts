import { PrismaService } from '../shared/prisma.service';
import { BookDTO } from './dto/book.dto';
export declare class AppService {
    private prismaService;
    constructor(prismaService: PrismaService);
    createBook(data: BookDTO): Promise<{
        id: string;
        title: string;
        author: string;
        year: string;
        gender: string;
        quantity: number;
    }>;
    getBooks(): Promise<{
        id: string;
        title: string;
        author: string;
        year: string;
        gender: string;
        quantity: number;
    }[]>;
    getBooksById(id: string): Promise<{
        id: string;
        title: string;
        author: string;
        year: string;
        gender: string;
        quantity: number;
    }>;
    getBooksFiltered(id?: string, title?: string, author?: string): Promise<{
        id: string;
        title: string;
        author: string;
        year: string;
        gender: string;
        quantity: number;
    }[]>;
    updateBooks(data: BookDTO, id: string): Promise<{
        id: string;
        title: string;
        author: string;
        year: string;
        gender: string;
        quantity: number;
    }>;
    borrowBooks(id: string): Promise<{
        id: string;
        title: string;
        author: string;
        year: string;
        gender: string;
        quantity: number;
    }>;
    deleteBooks(idBook: string): Promise<string>;
}
