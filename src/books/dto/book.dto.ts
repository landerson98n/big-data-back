import { IsString, IsNotEmpty, IsInt, IsUUID } from 'class-validator';

export class BookDTO{
    @IsString()
    @IsNotEmpty()
    title : string;

    @IsString()
    @IsNotEmpty()
    author : string;

    @IsString()
    @IsNotEmpty()
    year : string;

    @IsInt()
    @IsNotEmpty()
    quantity : number;

    @IsString()
    @IsNotEmpty()
    gender : string;
}

export class ParamBookDTO{
    @IsUUID()
    @IsString()
    id : string; 
}