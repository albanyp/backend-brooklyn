import { MigrationInterface, QueryRunner } from "typeorm"

export class addDefaultConstraintToUpdatedAtColumnMovieFrachiseTable1680753889396 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
			'ALTER TABLE "movie_franchise" ALTER "updated_at" SET DEFAULT NOW()'
		)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(
			'ALTER TABLE "movie_franchise" ALTER "updated_at" DROP DEFAULT'
		)
  }

}
