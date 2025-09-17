import { Prop, Schema } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class ChatSchema extends Document {
	@Prop({ type: String, required: true })
	public senderId!: string;

	@Prop({ type: String, required: true })
	public receiverId!: string;

	@Prop({ type: String, required: true })
	public message!: string;

	@Prop({ type: Date, required: true, default: Date.now })
	public createdAt!: Date;
}
