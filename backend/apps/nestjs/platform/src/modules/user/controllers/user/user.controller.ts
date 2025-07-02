import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserCreateDto, UserUpdateDto } from '../../dto';
import { UserSearchService, UserService } from '../../services';
import { User } from '../../types';

import { UserEntity } from '../../entities';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly userSearchService: UserSearchService
	) {}

	@Post()
	@ApiCreatedResponse({ type: UserEntity, description: 'User successfully created' })
	public create(@Body() dto: UserCreateDto): Promise<User> {
		return this.userService.create(dto);
	}

	@Post('search/index')
	@ApiOkResponse({ description: 'User search index was recreated and populated with all users' })
	public async createIndex(): Promise<{ message: string }> {
		await this.userSearchService.indexAll();

		return { message: 'User search index was recreated and populated with all users' };
	}

	@Get('list')
	@ApiOkResponse({ type: [UserEntity], description: 'List of all users' })
	public findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get('search')
	@ApiOkResponse({ type: [UserEntity], description: 'List of users matching the search query' })
	public search(@Query('query') query: string): Promise<User[]> {
		return this.userSearchService.search(query);
	}

	@Get(':id')
	@ApiOkResponse({ type: UserEntity, description: 'User by ID' })
	@ApiNotFoundResponse({ description: 'User not found' })
	public findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
		return this.userService.findOne(id);
	}

	@Patch(':id')
	@ApiOkResponse({ type: UserEntity, description: 'User successfully updated' })
	public update(@Param('id', ParseIntPipe) id: number, @Body() dto: UserUpdateDto): Promise<User> {
		return this.userService.update(id, dto);
	}

	@Delete(':id')
	@ApiOkResponse({ description: 'User deleted' })
	public remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.userService.remove(id);
	}
}
