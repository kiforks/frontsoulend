import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ChatDto } from '../../dto';
import { ChatService } from '../../services';

import { ChatSchema } from '../../schemas';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Post('send')
	@ApiOperation({ summary: 'Send a chat message' })
	@ApiCreatedResponse({
		type: ChatSchema,
		description: 'Message sent successfully. Returns the sent message schema.',
	})
	public sendMessage(@Body() chatDto: ChatDto): Promise<ChatSchema> {
		return this.chatService.sendMessage(chatDto);
	}

	@Get(':senderId/:receiverId/messages')
	@ApiOperation({ summary: 'Get all messages between two users' })
	@ApiParam({
		name: 'senderId',
		type: String,
		description: 'Sender user ID',
		example: '1',
	})
	@ApiParam({
		name: 'receiverId',
		type: String,
		description: 'Receiver user ID',
		example: '2',
	})
	@ApiOkResponse({
		type: [ChatSchema],
		description: 'Returns an array of chat messages between the users.',
	})
	public getMessages(
		@Param('senderId') senderId: string,
		@Param('receiverId') receiverId: string
	): Promise<ChatSchema[]> {
		return this.chatService.getMessages(senderId, receiverId);
	}
}
