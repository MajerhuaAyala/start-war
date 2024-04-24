import { DataSource, ObjectLiteral, Repository } from "typeorm";

export abstract class TypeOrmRepository<J extends ObjectLiteral> {
  constructor(private _cliente: Promise<DataSource>) {}

  protected client(): Promise<DataSource> {
    return this._cliente;
  }

  protected async repository(entity: any): Promise<Repository<J>> {
    return (await this._cliente).getRepository(entity);
  }
}
