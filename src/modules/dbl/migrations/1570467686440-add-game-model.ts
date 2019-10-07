import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGameModel1570467686440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "updated"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "created"`);
  }
}
