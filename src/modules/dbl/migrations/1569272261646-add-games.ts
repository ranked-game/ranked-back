import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGames1569272261646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gameId" integer NOT NULL, "accountId" uuid NOT NULL, "data" jsonb NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "created" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "games" ADD CONSTRAINT "FK_d7a686eeae99397ba0f62c5fc76" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "games" DROP CONSTRAINT "FK_d7a686eeae99397ba0f62c5fc76"`,
    );
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "updated"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "created"`);
    await queryRunner.query(`DROP TABLE "games"`);
  }
}
