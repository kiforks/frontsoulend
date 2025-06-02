import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ProductCreateDto, ProductUpdateDto } from '../../dto';
import { ProductService } from '../../services';

import { ProductEntity } from '../../entities';

@ApiTags('product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@ApiCreatedResponse({ type: ProductEntity })
	public create(@Body() dto: ProductCreateDto) {
		return this.productService.create(dto);
	}

	@Get()
	@ApiOkResponse({ type: [ProductEntity] })
	public findAll() {
		return this.productService.findAll();
	}

	@Get(':id')
	@ApiOkResponse({ type: ProductEntity })
	@ApiNotFoundResponse({ description: 'Product not found' })
	public findOne(@Param('id', ParseIntPipe) id: number) {
		return this.productService.findOne(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: ProductEntity })
	public update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductUpdateDto) {
		return this.productService.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ description: 'Product deleted' })
	public remove(@Param('id', ParseIntPipe) id: number) {
		return this.productService.remove(id);
	}
}
