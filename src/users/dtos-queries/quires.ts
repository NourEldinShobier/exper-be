import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class GetUsersQuery {
  @IsOptional()

  @IsPositive()
  @Min(1)
  @Type(() => Number)
  readonly pageNumber: number = 1;
  @IsOptional()

  @IsPositive()
  @Min(1)
  @Type(() => Number)
  readonly pageSize: number = 10;
}

export class SearchUsersQuery {

}

