import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISharePointFormProps {
  description: string;
 siteurl:string;
 context:WebPartContext;
 departmentoptions:any; // single selected dropdown
 genderoptions:any; //radio button
 skillsoptions:any; // check box
 cityoptions:any; //lookup
}
