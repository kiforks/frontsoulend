import { PartialType } from '@nestjs/mapped-types';

import { BrandCreateDto } from './brand-create.dto';

export class BrandUpdateDto extends PartialType(BrandCreateDto) {}
