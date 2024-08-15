import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookDTO } from './dto/book.dto';
import { PrismaService } from '../shared/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
 
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
    

  });

  describe('borrowBooks', () => {
    it('should return a error mensage', async () => {
      await expect(appController.borrowBooks('969c48dc-70ef-44f9-a85d-70c13b27d566')) 
      .rejects
      .toThrow(NotFoundException)
    });
  });

  describe('createBooks', () => {
    it('should return a book', async () => {
      const book: BookDTO = {
        title: 'Book to Delete',
        author: 'Author Doe',
        year: '2024',
        quantity: 5,
        gender: 'Non-Fiction',
      }
      await expect(appController.createBooks(book)).resolves.toMatchObject(book);
    });
  });

  describe('getBooks', () => {
    it('should return an array', async () => {
      await expect(appController.getBooks()).resolves.toBe([]); 
    });
  });

  describe('getBooksById', () => {
    it('should throw NotFoundException if book is not found', async () => {
      await expect(appController.getBooksById('969c48dc-70ef-44f9-a85d-70c13b27d566'))
      .rejects
      .toThrow(NotFoundException)
    });
  });
});
