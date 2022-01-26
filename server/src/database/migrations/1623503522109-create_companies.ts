import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createCompanies1607297095415 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'companies', // nome da tabela
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true, 
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10,
          precision: 2
        },
        {
            name: 'longitude',
            type: 'decimal',
            scale: 10,
            precision: 2
        },
        {
          name: 'address',
          type: 'text',
          scale: 10,
          precision: 2
        },
        {
          name: "health_plan",
          type: 'text'
        },
        {
            name: "specialization",
            type: 'text'
          },
        {
          name: "contact_phone",
          type: 'text'
        },
        {
          name: "services_hours",
          type: 'text'
        },
        {
          name: "open_on_weekends",
          type: 'boolean',
          default: false
        },
        {
          name: "accepted",
          type: 'boolean',
          default: false
        }
      ]
    }))
      
  }

  // desfazer o que fez no método up
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies')
  }
}