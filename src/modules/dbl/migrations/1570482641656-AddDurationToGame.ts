import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDurationToGame1570482641656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "games" ADD  IF NOT EXISTS "duration" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "gameId"`);
    await queryRunner.query(
      `ALTER TABLE "games" ADD IF NOT EXISTS "gameId" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "gameId"`);
    await queryRunner.query(
      `ALTER TABLE "games" ADD "gameId" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "duration"`);
  }
}
