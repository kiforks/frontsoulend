import { IsNumber, IsString } from 'class-validator';

export class ChatDto {
	@IsNumber()
	public senderId!: number;

	@IsNumber()
	public receiverId!: number;

	@IsString()
	public message!: string;
}
