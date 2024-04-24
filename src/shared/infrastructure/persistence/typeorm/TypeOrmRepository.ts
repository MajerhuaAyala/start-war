import { DataSource, ObjectLiteral, Repository } from "typeorm";

export abstract class TypeOrmRepository<J extends ObjectLiteral> {
  constructor(private _cliente: Promise<DataSource>) {}

  protected client(): Promise<DataSource> {
    return this._cliente;
  }

  async close() {
    await (await this._cliente).destroy();
  }

  protected async repository(entity: any): Promise<Repository<J>> {
    return (await this._cliente).getRepository(entity);
  }
}
