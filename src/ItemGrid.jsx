import { useEffect, useState } from "react"
import { Item } from "./Item";
import { getItem } from "./helpers/getItem";


export const ItemGrid = () => {
    

    const [items, setItem] = useState(['']);

    const getitem = async() => {
        const newItem = await getItem();
        setItem(newItem);
    }

    useEffect(() => {
      getitem();
    }, [ '']);


    return (
        <>
            <div className="card-grid">

                {
                    items.map( (item) =>(
                        <Item 
                        key={item.id} 
                        {...item}/>
                    ))
                }

            </div>
        </>
    )
    
    
}