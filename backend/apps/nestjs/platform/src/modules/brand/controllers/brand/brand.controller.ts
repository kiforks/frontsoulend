import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BrandCreateDto, BrandUpdateDto } from '../../dto';
import { BrandService } from '../../services';

import { BrandEntity } from '../../entities';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
	constructor(private readonly brandService: BrandService) {}

	@Post()
	@ApiCreatedResponse({ type: BrandEntity })
	public create(@Body() dto: BrandCreateDto) {
		return this.brandService.create(dto);
	}

	@Get()
	@ApiOkResponse({ type: [BrandEntity] })
	public findAll() {
		return this.brandService.findAll();
	}

	@Get(':id')
	@ApiOkResponse({ type: BrandEntity })
	@ApiNotFoundResponse({ description: 'Brand not found' })
	public findOne(@Param('id', ParseIntPipe) id: number) {
		return this.brandService.findOne(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: BrandEntity })
	public update(@Param('id', ParseIntPipe) id: number, @Body() dto: BrandUpdateDto) {
		return this.brandService.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ description: 'Brand deleted' })
	public remove(@Param('id', ParseIntPipe) id: number) {
		return this.brandService.remove(id);
	}
}
