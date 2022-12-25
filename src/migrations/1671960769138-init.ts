import { MigrationInterface, QueryRunner } from "typeorm";

export class init1671960769138 implements MigrationInterface {
    name = 'init1671960769138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mathangbienthe_giatribienthe" DROP CONSTRAINT "FK_295a609d0bf6196f1ad2e9a1f35"`);
        await queryRunner.query(`ALTER TABLE "mathangbienthe_giatribienthe" DROP CONSTRAINT "FK_251aece278837ef0cf2600a1d77"`);
        await queryRunner.query(`ALTER TABLE "giamgiadonhang" ALTER COLUMN "batdau" SET DEFAULT '"2022-12-25T09:32:50.501Z"'`);
        await queryRunner.query(`ALTER TABLE "mathangbienthe_giatribienthe" ADD CONSTRAINT "FK_251aece278837ef0cf2600a1d77" FOREIGN KEY ("giatribientheMagiatribienthe") REFERENCES "giatribienthe"("magiatribienthe") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mathangbienthe_giatribienthe" ADD CONSTRAINT "FK_295a609d0bf6196f1ad2e9a1f35" FOREIGN KEY ("mathangbientheMahangbienthe") REFERENCES "mathangbienthe"("mahangbienthe") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mathangbienthe_giatribienthe" DROP CONSTRAINT "FK_295a609d0bf6196f1ad2e9a1f35"`);
        await queryRunner.query(`ALTER TABLE "mathangbienthe_giatribienthe" DROP CONSTRAINT "FK_251aece278837ef0cf2600a1d77"`);
        await queryRunner.query(`ALTER TABLE "giamgiadonhang" ALTER COLUMN "batdau" SET DEFAULT '2022-12-25 08:59:15.612'`);
        await queryRunner.query(`ALTER TABLE "mathangbienthe_giatribienthe" ADD CONSTRAINT "FK_251aece278837ef0cf2600a1d77" FOREIGN KEY ("giatribientheMagiatribienthe") REFERENCES "giatribienthe"("magiatribienthe") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mathangbienthe_giatribienthe" ADD CONSTRAINT "FK_295a609d0bf6196f1ad2e9a1f35" FOREIGN KEY ("mathangbientheMahangbienthe") REFERENCES "mathangbienthe"("mahangbienthe") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
