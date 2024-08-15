import { AppService } from './app.service';
import { BookDTO } from './dto/book.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
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
    createBooks(data: BookDTO): Promise<{
        id: string;
        title: string;
        author: string;
        year: string;
        gender: string;
        quantity: number;
    }>;
    updateBooks(data: BookDTO, id: string): Promise<{
        id: string;
        title: string;
        author: string;
        year: string;
        gender: string;
        quantity: number;
    }>;
    deleteBooks(id: string): Promise<string>;
    borrowBooks(id: string): Promise<{
        id: string;
        title: string;
        author: string;
        year: string;
        gender: string;
        quantity: number;
    }>;
}
