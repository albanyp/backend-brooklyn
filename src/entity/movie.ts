import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity()
export class Movie {
  @PrimaryColumn({
    default: uuidv4
  })
  id: string

  @Column()
  title: string

  @Column({
    name: 'release_date'
  })
  releaseDate: Date

  @Column({
    name: 'group_name'
  })
  groupName: string

  @Column()
  position: number

  @Column()
  author: string

  @Column()
  producer: string

  @Column({
    name: 'logo_url'
  })
  logoUrl: string

  @Column({
    name: 'created_at',
    nullable: true
  })
  createdAt: Date

  @Column({
    name: 'updated_at',
    nullable: true
  })
  updatedAt: Date
}