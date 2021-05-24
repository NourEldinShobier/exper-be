import { ArgumentMetadata, ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  constructor(private prisma: PrismaService) { }

  async transform(dto: CreateUserDto, _metadata: ArgumentMetadata): Promise<CreateUserDto> {

    if (await this.isExistingUser(dto.username)) {
      throw new ConflictException('Account with provided username already exists');
    }

    return dto;
  }

  private async isExistingUser(username: string): Promise<boolean> {
    const response = await this.prisma.user.findUnique({
      where: {
        username
      }
    });

    return response !== null;
  }
}
