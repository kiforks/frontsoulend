import { Prop, Schema } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class ChatSchema extends Document {
	@Prop({ required: true })
	public senderId!: string;

	@Prop({ required: true })
	public receiverId!: string;

	@Prop({ required: true })
	public message!: string;

	@Prop({ required: true, default: Date.now })
	public createdAt!: string;
}
