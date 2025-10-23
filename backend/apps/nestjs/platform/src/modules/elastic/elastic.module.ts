import { EnvironmentService } from '@libs/nestjs/core';
import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Global()
@Module({
	imports: [
		ElasticsearchModule.registerAsync({
			useFactory: (environmentService: EnvironmentService) => ({
				node: environmentService.get('ELASTICSEARCH_URL'),
				requestTimeout: 600,
				ssl: false,
			}),
			inject: [EnvironmentService],
		}),
	],
	exports: [ElasticsearchModule],
})
export class ElasticModule {}
