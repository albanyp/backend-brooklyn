import { MigrationInterface, QueryRunner } from "typeorm"

export class addDefaultConstraintToMovieTable1680582708155 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "movie" ALTER "created_at" SET DEFAULT NOW()'
    )
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "movie" ALTER "created_at" DROP DEFAULT'
    )
  }

}
