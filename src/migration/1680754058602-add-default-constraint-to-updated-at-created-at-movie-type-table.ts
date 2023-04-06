import { MigrationInterface, QueryRunner } from "typeorm"

export class addDefaultConstraintToUpdatedAtCreatedAtMovieTypeTable1680754058602 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(
			'ALTER TABLE "movie_type" ALTER "created_at" SET DEFAULT NOW()'
		)

		queryRunner.query(
			'ALTER TABLE "movie_type" ALTER "updated_at" SET DEFAULT NOW()'
		)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(
			'ALTER TABLE "movie_type" ALTER "created_at" DROP DEFAULT'
		)

		queryRunner.query(
			'ALTER TABLE "movie_type" ALTER "updated_at" DROP DEFAULT'
		)
  }

}
