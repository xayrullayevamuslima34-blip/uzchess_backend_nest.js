import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SouvenirImagesAdminService } from '../../services/souvenirImages/souvenirImages.admin.service';
import { SouvenirImagesCreateAdminDto } from '../../dtos/souvenirImages/admin/souvenirImages.create.admin.dto';
import { SouvenirImagesUpdateAdminDto } from '../../dtos/souvenirImages/admin/souvenirImages.update.public.dto';
import { SouvenirImagesFilter } from '../../filters/souvenirImages.filter';
import { storageOptions } from '../../../../config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

@Controller("admin/souvenirImages")
export class SouvenirImagesAdminController{

  constructor(private readonly souvenirImageService: SouvenirImagesAdminService) {}

  @Get("list")
  async getAll(@Query() filter: SouvenirImagesFilter){
    return this.souvenirImageService.getAll(filter);
  }

  @Get(":id")
  async getOne(@Param("id", ParseIntPipe) id: number){
    return this.souvenirImageService.getOne(id)
  }

  @UseInterceptors(FileInterceptor("image", {storage: storageOptions}))
  @ApiConsumes('multipart/form-data')
  @Post("create")
  async create(@Body() payload: SouvenirImagesCreateAdminDto, @UploadedFile() image: Express.Multer.File){
    return this.souvenirImageService.create(payload, image);
  }

  @UseInterceptors(FileInterceptor("image", {storage: storageOptions}))
  @ApiConsumes('multipart/form-data')
  @Patch("update/:id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() payload: SouvenirImagesUpdateAdminDto, @UploadedFile() image: Express.Multer.File){
    return this.souvenirImageService.update(id, payload, image);
  }

  @Delete("delete/:id")
  async delete(@Param("id", ParseIntPipe) id: number){
    return this.souvenirImageService.delete(id);
  }

}