import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Global()
@Module({
	imports: [
		ElasticsearchModule.registerAsync({
			useFactory: (configService: ConfigService) => ({
				node: configService.get('ELASTICSEARCH_URL'),
				requestTimeout: 600,
				ssl: false,
			}),
			inject: [ConfigService],
		}),
	],
	exports: [ElasticsearchModule],
})
export class ElasticModule {}
