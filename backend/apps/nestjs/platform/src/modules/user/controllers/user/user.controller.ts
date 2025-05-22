import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserCreateDto, UserUpdateDto } from '../../dto';
import { UserService } from '../../services';

import { UserEntity } from '../../entities';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiCreatedResponse({ type: UserEntity })
	public create(@Body() dto: UserCreateDto) {
		return this.userService.create(dto);
	}

	@Get()
	@ApiOkResponse({ type: [UserEntity] })
	public findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	@ApiOkResponse({ type: UserEntity })
	@ApiNotFoundResponse({ description: 'User not found' })
	public findOne(@Param('id', ParseIntPipe) id: number) {
		return this.userService.findOne(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: UserEntity })
	public update(@Param('id', ParseIntPipe) id: number, @Body() dto: UserUpdateDto) {
		return this.userService.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ description: 'User deleted' })
	public remove(@Param('id', ParseIntPipe) id: number) {
		return this.userService.remove(id);
	}
}
