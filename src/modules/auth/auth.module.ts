import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../../entity/user'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../constants'
// import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '360s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})

export class AuthModule {}