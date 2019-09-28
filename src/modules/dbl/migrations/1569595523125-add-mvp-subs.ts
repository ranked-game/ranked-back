import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMvpSubs1569595523125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "mvp_subscribers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(300) NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f0dacb8276c96e846c63e92c8c5" UNIQUE ("email"), CONSTRAINT "PK_0cd4ea928e8fe06b575026f1b33" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "mvp_subscribers"`);
  }
}
