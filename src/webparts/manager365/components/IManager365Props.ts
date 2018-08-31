import { SPHttpClient } from "@microsoft/sp-http";

export interface IManager365Props {
  spHttpClient: SPHttpClient;
  description: string;
}
