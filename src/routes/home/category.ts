import axios from "axios";
import { backendUrl } from "../../App";

export type category_type = string | null;
export interface CatBox{
    category: category_type,
    sub_categories: string[],
}
export async function getCategories(){
    const res = await axios({
        method:'get',
        url:`${backendUrl}/categories`,
    })
    let cats: CatBox[]=[];
    if(res.data.success){
        for(let i of res.data.data){
            const subCats = await axios({
                method:'get',
                url:`${backendUrl}/categories`,
                headers:{
                    sub_category:i.category
                }
            })
            cats.push({category:i.category, sub_categories: subCats.data.data});
        }
        return {success: true, data: cats};
    }
    else{
        return {success: false, data:[]};
    }
}
