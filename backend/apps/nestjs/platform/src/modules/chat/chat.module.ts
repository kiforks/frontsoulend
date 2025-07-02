import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

import { ChatService } from './services';

import { ChatController } from './controllers';
import { ChatGateway } from './gateways';
import { ChatSchema } from './schemas';

@Module({
	imports: [MongooseModule.forFeature([{ name: ChatSchema.name, schema: SchemaFactory.createForClass(ChatSchema) }])],
	controllers: [ChatController],
	providers: [ChatService, ChatGateway],
	exports: [ChatService, ChatGateway],
})
export class ChatModule {}
