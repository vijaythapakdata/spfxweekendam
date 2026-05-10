import { INasaItem } from "../../../CommonMethods/INasaImageResponse";

export interface IGraphApikeyProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  apollomissionImages:INasaItem
}
