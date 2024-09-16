import { MigrationInterface, QueryRunner, TableUnique } from "typeorm"

export class addUniqueConstraintToTitleColumnMovieTable1705987466590 implements MigrationInterface {
    tableConstraint = new TableUnique({
        name: 'title_movie_constraint',
        columnNames: ['title']
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createUniqueConstraint('movie', this.tableConstraint)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint('movie', this.tableConstraint)
    }

}
