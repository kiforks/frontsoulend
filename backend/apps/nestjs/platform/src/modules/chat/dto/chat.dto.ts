import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsString } from 'class-validator';

export class ChatDto {
	@ApiProperty({
		example: 1,
		description: 'ID of the user sending the message',
	})
	@IsNumber()
	public senderId!: number;

	@ApiProperty({
		example: 2,
		description: 'ID of the user receiving the message',
	})
	@IsNumber()
	public receiverId!: number;

	@ApiProperty({
		example: 'Hello!',
		description: 'Text content of the message',
	})
	@IsString()
	public message!: string;
}
