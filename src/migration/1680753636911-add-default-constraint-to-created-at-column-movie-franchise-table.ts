import { MigrationInterface, QueryRunner } from "typeorm"

export class addDefaultConstraintToCreatedAtColumnMovieFranchiseTable1680753636911 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE "movie_franchise" ALTER "created_at" SET DEFAULT NOW()'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      'ALTER TABLE "movie_franchise" ALTER "created_at" DROP DEFAULT'
    )
  }
}
