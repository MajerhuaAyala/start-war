import { SwapiConfig } from "./SwapiConfig";
import axios, { AxiosInstance } from "axios";

export class SwapiClientFactory {
  private static instance: AxiosInstance;

  static createClient(config: SwapiConfig): AxiosInstance {
    try {
      if (!SwapiClientFactory.instance) {
        SwapiClientFactory.instance = axios.create({
          baseURL: config.url,
        });
      }

      return SwapiClientFactory.instance;
    } catch (e) {
      console.log(">Error Axios: ", e);
      throw new Error("Internar error");
    }
  }
}
