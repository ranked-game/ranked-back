import {MigrationInterface, QueryRunner} from "typeorm";

export class renameLogoToAvatar1573126001309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "logo" TO "avatar"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "accounts" RENAME COLUMN "avatar" TO "logo"`);
    }

}
