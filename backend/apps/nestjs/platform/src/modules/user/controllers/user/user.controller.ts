import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import {
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';

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
	@ApiOperation({ summary: 'Create a new user' })
	@ApiBody({ type: UserCreateDto, description: 'User creation data' })
	@ApiCreatedResponse({
		type: UserEntity,
		description: 'User successfully created',
	})
	public create(@Body(new ValidationPipe()) dto: UserCreateDto): Promise<User> {
		return this.userService.create(dto);
	}

	@Post('search/index')
	@ApiOperation({
		summary: 'Recreate and populate user search index',
		description: 'This operation will rebuild the user search index and populate it with all existing users.',
	})
	@ApiOkResponse({
		description: 'User search index was recreated and populated with all users',
	})
	public async createIndex(): Promise<{ message: string }> {
		await this.userSearchService.indexAll();

		return {
			message: 'User search index was recreated and populated with all users',
		};
	}

	@Get('list')
	@ApiOperation({ summary: 'Get list of all users' })
	@ApiOkResponse({
		type: [UserEntity],
		description: 'List of all users',
	})
	public findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get('search')
	@ApiOperation({ summary: 'Search users by query' })
	@ApiQuery({
		name: 'query',
		type: String,
		required: true,
		description: 'Text query for user search',
		example: 'john',
	})
	@ApiOkResponse({
		type: [UserEntity],
		description: 'List of users matching the search query',
	})
	public search(@Query('query') query: string): Promise<User[]> {
		return this.userSearchService.search(query);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user by ID' })
	@ApiOkResponse({
		type: UserEntity,
		description: 'User by ID',
	})
	@ApiNotFoundResponse({ description: 'User not found' })
	public findOne(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
		return this.userService.findOne(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update user by ID' })
	@ApiBody({ type: UserUpdateDto, description: 'User update data' })
	@ApiOkResponse({
		type: UserEntity,
		description: 'User successfully updated',
	})
	public update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) dto: UserUpdateDto): Promise<User> {
		return this.userService.update(id, dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete user by ID' })
	@ApiOkResponse({ description: 'User deleted' })
	public remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
		return this.userService.remove(id);
	}
}
