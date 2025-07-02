import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ChatDto } from '../../dto';
import { ChatService } from '../../services';

import { ChatSchema } from '../../schemas';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Post('send')
	@ApiCreatedResponse({ type: ChatSchema })
	public sendMessage(@Body() chatDto: ChatDto): Promise<ChatSchema> {
		return this.chatService.sendMessage(chatDto);
	}

	@Get(':senderId/:receiverId/messages')
	@ApiOkResponse({ type: [ChatSchema] })
	public getMessages(
		@Param('senderId') senderId: string,
		@Param('receiverId') receiverId: string
	): Promise<ChatSchema[]> {
		return this.chatService.getMessages(senderId, receiverId);
	}
}
