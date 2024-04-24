import { SwapiConfig } from "../../../../shared/infrastructure/externalApi/swapi/SwapiConfig";
import { SWAPI_BASE_URL } from "../../../../shared/domain/config";

export class SwapiConfigFactory {
  static createConfig(): SwapiConfig {
    return {
      url: SWAPI_BASE_URL,
    };
  }
}
