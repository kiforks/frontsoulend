import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ChatDto } from '../../dto';

import { ChatSchema } from '../../schemas';

import { Model } from 'mongoose';

@Injectable()
export class ChatService {
	constructor(@InjectModel(ChatSchema.name) private readonly ChatModel: Model<ChatSchema>) {}

	public sendMessage(chatDto: ChatDto): Promise<ChatSchema> {
		const chatMessage = new this.ChatModel(chatDto);

		return chatMessage.save();
	}

	public getMessages(senderId: string, receiverId: string): Promise<ChatSchema[]> {
		return this.ChatModel.find({
			$or: [
				{ senderId, receiverId },
				{ senderId: receiverId, receiverId: senderId },
			],
		}).sort({ createdAt: 1 });
	}
}
