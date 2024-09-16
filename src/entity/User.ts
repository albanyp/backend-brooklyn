import { IsEmail, IsNotEmpty } from "class-validator"
import { Entity, Column, PrimaryColumn } from "typeorm"
import { v4 as uuidv4 } from 'uuid' 

@Entity('user')
export class User {

  @PrimaryColumn({
    default: () => uuidv4()
  })
  // @Generated("uuid")
  id: string

  @Column({
    nullable: false
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Column({
    nullable: false
  })
  @IsNotEmpty()
  password: string

  @Column({
    name: 'first_name',
    nullable: false
  })
  firstName: string

  @Column({
    name: 'last_name',
    nullable: false
  })
  lastName: string

  @Column({
    nullable: true
  })
  nickname: string

  @Column({
    nullable: true
  })
  birthdate: Date

  @Column({
    name: 'logo_url',
    nullable: true
  })
  logoUrl: string

}
