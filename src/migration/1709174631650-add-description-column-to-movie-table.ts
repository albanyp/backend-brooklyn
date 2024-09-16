import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addDescriptionColumnToMovieTable1709174631650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'movie',
            new TableColumn({
                name: 'description',
                type: 'varchar',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('movie', 'description')
    }

}
