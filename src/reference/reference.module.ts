import { Module } from '@nestjs/common'
import { ReferenceResolver } from './reference.resolver'
import { RetailService } from '../retail_api/retail.service'

@Module({
  imports: [],
  providers: [ReferenceResolver, RetailService],
})
export class ReferenceModule {}
