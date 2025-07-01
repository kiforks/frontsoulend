import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import { UserUpdateDto } from '../../dto';
import { User } from '../../types';

import { PrismaService } from '../../../prisma';
import { UserConfig } from '../../configs';

@Injectable()
export class UserSearchService implements OnModuleInit {
	constructor(
		private readonly elasticsearchService: ElasticsearchService,
		private readonly prismaService: PrismaService
	) {}

	public async onModuleInit(): Promise<void> {
		await this.indexAll();
	}

	public async index(user: User): Promise<void> {
		await this.elasticsearchService.index<User>({
			index: UserConfig.Key,
			id: user.id.toString(),
			document: user,
		});
	}

	public async createIndex(): Promise<void> {
		const exists = await this.elasticsearchService.indices.exists({ index: UserConfig.Key });

		if (!exists) {
			await this.elasticsearchService.indices.create({
				index: UserConfig.Key,
				settings: {
					analysis: {
						tokenizer: {
							edge_ngram_tokenizer: {
								type: 'edge_ngram',
								min_gram: 1,
								max_gram: 25,
								token_chars: ['letter', 'digit'],
							},
						},
						analyzer: {
							edge_ngram_analyzer: {
								type: 'custom',
								tokenizer: 'edge_ngram_tokenizer',
							},
						},
					},
				},
				mappings: {
					properties: {
						email: { type: 'text', analyzer: 'standard' },
						name: { type: 'text', analyzer: 'standard' },
					},
				},
			});

			return;
		}

		await this.elasticsearchService.indices.delete({ index: UserConfig.Key });
	}

	public async remove(id: number): Promise<void> {
		await this.elasticsearchService.delete({
			index: UserConfig.Key,
			id: id.toString(),
		});
	}

	public async update(id: number, data: Partial<UserUpdateDto>): Promise<void> {
		await this.elasticsearchService.update({
			index: UserConfig.Key,
			id: id.toString(),
			doc: data,
		});
	}

	public async search(query: string): Promise<User[]> {
		const {
			hits: { hits },
		} = await this.elasticsearchService.search<User>({
			index: UserConfig.Key,
			query: {
				bool: {
					should: [{ match_phrase_prefix: { name: query } }, { match_phrase_prefix: { email: query } }],
					minimum_should_match: 1,
				},
			},
		});

		return hits.map(hit => hit._source).filter(source => !!source);
	}

	public async indexCollection(): Promise<void> {
		const users = await this.prismaService.user.findMany();

		for (const user of users) {
			// eslint-disable-next-line no-await-in-loop
			await this.index(user);
		}
	}

	public async indexAll(): Promise<void> {
		await this.createIndex();
		await this.indexCollection();
	}
}
