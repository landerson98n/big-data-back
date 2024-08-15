import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { BookDTO } from './dto/book.dto';
import { UUID } from 'crypto';
import { isUUID } from 'class-validator';
import { ApiQuery } from '@nestjs/swagger';

@Controller('books')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-books')
  async getBooks() {
    return await this.appService.getBooks();
  }

  @Get('get-books-id')
  async getBooksById(@Param('id') id: string) {
    const books = await this.appService.getBooksById(id)
    if(!books){
      throw new NotFoundException('Book not found');
    }
    return await this.appService.getBooksById(books.id);
  }

  @ApiQuery({
    name: "id",
    type: String,
    required: false
  })
  @ApiQuery({
    name: "title",
    type: String,
    required: false
  })
  @ApiQuery({
    name: "author",
    type: String,
    required: false
  })
  @Get('get-books-filtered')
  async getBooksFiltered(@Query('id') id?: string, @Query('title') title?: string, @Query('author') author?: string) {
    
    if (id && !isUUID(id)) {
      throw new BadRequestException('ID is invalid. Must be a valid UUID.');
    }

    const books = this.appService.getBooksFiltered(id, title, author);

    if(!books || (await books).length == 0){
      throw new NotFoundException('Book not found');
    }
    return books
  }

  @Post('create-books')
  async createBooks(@Body() data : BookDTO) {
    return await this.appService.createBook(data);
  }

  @Patch('update-books')
  async updateBooks(@Body() data : BookDTO, @Param() id: string) {
    const books = await this.appService.getBooksById(id)

    if(!books){
      throw new NotFoundException('Book not found');
    }
    return await this.appService.updateBooks(data, books.id);
  }

  @Delete('delete-books')
  async deleteBooks(@Param('id') id: string) {
    const books = await this.appService.getBooksById(id)
    
    if(!books){
      throw new NotFoundException('Book not found');
    }
    return await this.appService.deleteBooks(books.id);
  }

  @Patch('borrow-books')
  async borrowBooks(@Param('id') id: string) {
    const books = await this.appService.getBooksById(id)

    if(!books){
      throw new NotFoundException('Book not found');
    }
    return await this.appService.borrowBooks(books.id);
  }
}
