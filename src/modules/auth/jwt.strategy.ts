import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../constants';
import { LogInDto } from './dtos/log-in.dto';

const PassportJwtStrategy: new(...args) => Strategy = PassportStrategy(Strategy, 'jwt');

@Injectable()
export class JwtStrategy extends PassportJwtStrategy {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: LogInDto) {
    return { email: payload.email, password: payload.password };
  }
}
