import {sp} from "@pnp/sp/presets/all";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { ListName } from "../Enum/ListName";
export const FormikService=()=>{

    const createItems=async(body:any)=>{
        const createItems=await sp.web.lists.getByTitle(ListName.FormikList).items.add(body);
        return createItems
    }
return(
   {createItems}
)
}