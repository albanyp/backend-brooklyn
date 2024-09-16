import { MigrationInterface, QueryRunner, TableUnique } from "typeorm"

export class addMovieFranchiseNameColumnUniqueConstraint1705986187388 implements MigrationInterface {
    tableConstraint = new TableUnique({
        name: 'franchise_name_constraint',
        columnNames: ['name']
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createUniqueConstraint('movie_franchise', this.tableConstraint)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint('movie_franchise', this.tableConstraint)
    }

}
