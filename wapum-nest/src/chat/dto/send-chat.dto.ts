import { IsString, MinLength } from 'class-validator';

export class SendChatDto {
  @IsString()
  @MinLength(1)
  content: string;
}
