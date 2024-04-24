import { DataSource } from "typeorm";
import { TypeOrmConfig } from "./TypeOrmConfig";

export class TypeOrmClientFactory {
  static async createClient(config: TypeOrmConfig): Promise<DataSource> {
    const connection = new DataSource({
      type: "mysql",
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      // @ts-ignore
      entities: [
        __dirname +
          "/../../../../context/**/infrastructure/persistence/typeorm/*{.js,.ts}",
      ],
      synchronize: false,
      logging: false,
    });
    return connection.initialize();
  }
}
