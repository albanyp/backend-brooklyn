import { MigrationInterface, QueryRunner } from "typeorm"

export class addDefaultConstraintToUpdatedAtColumnMovieTable1680752693194 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE "movie" ALTER"updated_at" SET DEFAULT NOW()'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE "movie" ALTER "updated_at" DROP DEFAULT'
    )
  }

}
