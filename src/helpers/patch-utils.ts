import { BadRequestException } from '@nestjs/common'


export const validateEntityKeys = (validKeys: string[], data: { key: string }) => {
  if(!validKeys.includes(data.key)) {
    throw new BadRequestException(`Invalid key. Supported keys are the following: ${validKeys.join(', ')}`)
  }
}