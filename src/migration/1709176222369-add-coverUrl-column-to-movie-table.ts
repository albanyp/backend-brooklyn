import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addCoverUrlColumnToMovieTable1709176222369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'movie',
            new TableColumn({
                name: 'cover_url',
                type: 'text',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('movie', 'cover_url')
    }

}
