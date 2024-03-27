import { useEffect, useState } from "react"
import { Item } from "./Item";
import { getItem } from "../helpers/getItem";
import { Modals } from "../Components/Modals";
import "../../styles.css"
import { useNavigate } from "react-router-dom";


export const ItemGrid = () => {
    
    const [openModal, setOpenModal] = useState(false);

    const [items, setItem] = useState(['']);

    const [copyitems, setCopyItem] = useState(['']);

    const navigate = useNavigate();



    const getitem = async() => {
        const newItem = await getItem();
        setItem(newItem);
        setCopyItem(newItem);
    }

    const deleteItem = (itemToDelete) => {
        const updatedItems = items.filter(item => item !== itemToDelete);
        setItem(updatedItems);
    }

    const AddItem = (itemNew) => {
        setItem([...items, itemNew])
    }


    const EditItem = (itemEdit) => {
        const updatedItems = items.map(item => {
            if (item.id === itemEdit.id) {
                return {
                    ...item,
                    name: itemEdit.name,
                    species: itemEdit.species
                }
            }
            return item;
        });
        setItem(updatedItems);
    }

    const goBack = (event) => {
        event.preventDefault(); 

        navigate('/'); 
    }

    const Buscador = (event) => {
        
        const search = event.target.value.toLowerCase();

        const buscandoItem = search === '' ? copyitems : items.filter(item => item.name.toLowerCase().includes(search));
        
        setItem(buscandoItem)
    }

    

    useEffect(() => {
      getitem();
      
    }, []);


    return (
        <>
            <div className="card-grid">

                <button className="GoBack" onClick={goBack}>Exit</button>

                <input 
                type="text" 
                className="Searcher"
                placeholder="Search"
                onChange={Buscador}/>

                {
                    items.map( (item) =>(
                        <Item
                        key={item.id}
                        deleteitem={deleteItem} 
                        item={item}
                        editItem={EditItem}
                        />
                    ))
                }

            </div>


            <button className="fb-more" onClick={()=>{
        setOpenModal(true);
      }}>Crear</button>
      {openModal && <Modals setOpenModal={setOpenModal} addItem={AddItem} ultimoId={items.length}/>}
        </>
    )
    
    
}