import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFirstWebPartProps {
  description: string;
  context:WebPartContext;
  siteurl:string;
  currentUserName:string;
}
