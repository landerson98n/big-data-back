import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { BookDTO } from './dto/book.dto';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async createBook(data: BookDTO) {
    return this.prismaService.book.create({data})
  }
  async getBooks() {
    return await this.prismaService.book.findMany()
  }

  async getBooksById(id: string) {
    return this.prismaService.book.findFirst({where:{id}})
  }

  async getBooksFiltered(id?: string, title?: string, author?: string) {
    if(id){
      return this.prismaService.book.findMany({
        where:{
          id
        }
      })
    }else if (title){
      return this.prismaService.book.findMany({
        where:{
          title
        }
      })
    }else if(author){
      return this.prismaService.book.findMany({
        where:{
          author
        }
      })
    }
  }

  async updateBooks(data: BookDTO, id: string) {
    return await this.prismaService.book.update({data, where: {id} })
  }

  async borrowBooks(id: string) {
    const book = this.prismaService.book.findFirst({
      where: {id}
    })
    return this.prismaService.book.update({data:{quantity: (await book).quantity - 1}, where: {id} })
  }
  
  async deleteBooks(idBook: string) {
    await this.prismaService.book.delete({
      where: {
        id: idBook
      }
    })
    return 'Book deleted successfully'
  }

}
