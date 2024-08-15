import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/books/app.module';
import { BookDTO } from 'src/books/dto/book.dto';
import { response } from 'express';
import { AppService } from '../src/books/app.service';
import { PrismaService } from '../src/shared/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdBookId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AppService, PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/createBook')
      .send({
        title: 'Book to Delete',
        author: 'Author Doe',
        year: '2024',
        quantity: 5,
        gender: 'Non-Fiction',
      });

    createdBookId = response.body.id;

  });

  it('/getBooks (GET)', () => {
    return request(app.getHttpServer())
      .get('/getBooks')
      .expect(200)
      .expect((response)=>{
        expect(response).toBe(BookDTO)
      });
  });

  it('/createBook (POST)', () => {
    const newBook = {
      title: 'New Book',
      author: 'John Doe',
      year: '2024',
      quantity: 10,
      gender: 'Fiction',
    };

    return request(app.getHttpServer())
      .post('/createBook')
      .send(newBook)
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty('title', 'New Book');
        expect(response.body).toHaveProperty('author', 'John Doe');
        expect(response.body).toHaveProperty('year', '2024');
        expect(response.body).toHaveProperty('quantity', 10);
        expect(response.body).toHaveProperty('gender', 'Fiction');
      });
  });

  it('/delete/:id  (DELETE)', async () => {
      await request(app.getHttpServer())
      .delete(`/delete/${createdBookId}`)
      .expect(200)
      .expect((response)=>{
        expect(response.body).toHaveProperty('message', 'Book deleted successfully');
      });

      await request(app.getHttpServer())
      .get(`/get-books-filtered?id=${createdBookId}`)
      .expect(404);
  });
});
