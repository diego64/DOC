import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createImages1607556893376 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
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
                    name: 'path', // caminho da imagem
                    type: 'varchar'
                },
                {
                    // relacionamento de 1 para muitos (1-n), 1 empresa possui varias imagens e varias imagens só possui uma empresa
                    name: 'company_id',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageCompany',
                    columnNames: ['company_id'], // nome da coluna que vai possuir o relacionamento
                    referencedTableName: 'companies', // tabela com qual está se relacionando 
                    referencedColumnNames: ['id'], // dentro da tabela de empresas com qual coluna vai estar se relacionando
                    onUpdate: 'CASCADE', // caso o id da empresa tenha sido atualizado ele vai alterar o id dele em todas as imagens que possuírem o relacionamento
                    onDelete: 'CASCADE' // caso a empresa seja deleto as imagens também serão
                }
            ]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
    }

}
