import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';

import { ChatDto } from '../../dto';
import { ChatService } from '../../services';

import { ChatEvent } from '../../events';

import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	public readonly server!: Server;

	private readonly clients = new Set<string>();

	constructor(private readonly chatService: ChatService) {}

	public handleConnection(client: Socket): void {
		this.clients.add(client.id);
		this.server.emit(ChatEvent.UserConnected, {
			clientId: client.id,
			clientsCount: this.clients.size,
		});
	}

	public handleDisconnect(client: Socket): void {
		this.clients.delete(client.id);
		this.server.emit(ChatEvent.UserDisconnected, {
			clientId: client.id,
			clientsCount: this.clients.size,
		});
	}

	@SubscribeMessage(ChatEvent.SendMessage)
	public async handleMessage(@MessageBody() chatDto: ChatDto): Promise<void> {
		await this.chatService.sendMessage(chatDto);

		this.server.emit(ChatEvent.ReceiveMessage, chatDto);
	}
}
