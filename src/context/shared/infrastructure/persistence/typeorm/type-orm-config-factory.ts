import { TypeOrmConfig } from "../../../../../shared/infrastructure/persistence/typeorm/type-orm-config";
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
} from "../../../../../shared/domain/config";

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      database: DATABASE_NAME,
      host: DATABASE_HOST,
      password: DATABASE_PASSWORD,
      port: DATABASE_PORT,
      username: DATABASE_USERNAME,
    };
  }
}
