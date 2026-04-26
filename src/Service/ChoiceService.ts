import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ListName } from "../Enum/ListName";

export default class ChoiceService{
    private context:WebPartContext;
    constructor(context:WebPartContext){
        this.context=context;
    }

public async getChoiceValues(siteurl:string,fieldValue:any):Promise<any>{ // My Department =>MyDepartme
    try{
const response=await fetch(`${siteurl}/_api/web/lists/getbytitle('${ListName.SharePointListName}')/fields/?$filter=EntityPropertyName eq '${fieldValue}'`,
    {
        method:'GET',
        headers:{
            'Accept':'application/json;odata=nometadata'
        }
    }
);
if(!response.ok){
    throw new Error(`Error while fetching choice values:${response.statusText}`);
    
}
const data=await response.json();
const choice=data.value[0].Choices;
return choice.map((item:any)=>({
key:item,
text:item
}));
    }
    catch(err){
console.log("error");
throw err;
    }

}

//lookup

public async getLookupValueforCities():Promise<void>{
    try{
const response=await fetch(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${ListName.LookupList}')/items?$select=ID,Title`,{
    method:'GET',
    headers:{
         'Accept':'application/json;odata=nometadata'
    }
});
if(!response.ok){
    throw new Error(`Error while fetching choice values:${response.statusText}`);
    
}
const data=await response.json();
return data.value.map((city:{Title:string,ID:string})=>({
    key:city.ID,
    text:city.Title
}));
    }
    catch(err){
console.log(err);
    }
}
}