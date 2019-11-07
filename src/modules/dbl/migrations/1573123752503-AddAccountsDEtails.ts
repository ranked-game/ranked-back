import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAccountsDEtails1573123752503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "accounts" ADD "nickname" character varying(50) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD "logo" character varying(500)`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "logo"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "nickname"`);
    }

}
