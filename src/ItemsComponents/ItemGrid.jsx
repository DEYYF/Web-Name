import { useEffect, useState } from "react"
import { getItem } from "../helpers/getItem";
import { Modals } from "../Components/Modals";
import { useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ModalsEdits } from "../Components/ModalsEdit";
import "../../styles.css"


export const ItemGrid = () => {
    
    const [openModal, setOpenModal] = useState(false);

    const [openModal2, setOpenModal2] = useState(false);

    const [selectedItem, setSelectedItem] = useState(null)

    const [items, setItem] = useState(['']);

    const [copyitems, setCopyItem] = useState(['']);

    const [RowSelected, setRowSelected] = useState(null)

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

        if (event.target.value.length >= 3) {
            const search = event.target.value.toLowerCase();

            const buscandoItem = items.filter(item => item.name.toLowerCase().includes(search));
        
            setItem(buscandoItem)
        }else {
            setItem(copyitems)
        }
        
        
    }

    

    useEffect(() => {
      getitem();
      
    }, []);




    const imageBody = (item) => {
        console.log(item.image)
        return <img src={item.image} alt={item.image} className="w-6rem shadow-2 border-round"/>;
    }

    const buttonDeleteBody = (item) => {
        return <button className="bt-eliminar" onClick={() =>deleteItem(item)}>Eliminar</button>
    }

    const changeColor = (event) => {

        if (RowSelected != null && RowSelected.originalEvent != null) {

            RowSelected.originalEvent.target.style.background = "White"

            console.log(event.originalEvent.target);
        
        }

        setRowSelected(event)

        if (event.originalEvent != null) {
            event.originalEvent.target.style.background = '#ADD8E6';
            console.log(event.originalEvent.target);
        }

    }

    const changeColorDesSelect = (event) => {


            event.originalEvent.target.style.background = 'White';
            console.log(event.originalEvent.target);


    }

    

    return (
        <>
            <div className="card-grid">

                <button className="GoBack" onClick={goBack}>Exit</button>

                
                    <input 
                    type="text" 
                    className="Searcher"
                    placeholder="Search"
                    onChange={Buscador}/>

                    <DataTable value={items} selectionMode="single"  selection= {selectedItem} onSelectionChange={(e) =>{setSelectedItem(e.value); setOpenModal2(false);  }}
                     onRowClick={changeColor}>
                        
                        <Column field="name" header="Name"></Column>
                        <Column header="Image" body={imageBody}></Column>
                        <Column field="species" header="Species"></Column>
                        <Column header= "Eliminar" body={buttonDeleteBody}></Column>
                    </DataTable>

                    <button className="fb-more" onClick={()=>{setOpenModal(true);}}>Crear</button>
                    {openModal && <Modals setOpenModal={setOpenModal} addItem={AddItem} ultimoId={items.length}/>}

                    <button className="fb-edit" onClick={()=>{setOpenModal2(true);}}>Editar</button>
                    {openModal2 && selectedItem != null  && <ModalsEdits setOpenModal={setOpenModal2} item={selectedItem} updateItem={EditItem} setSelected={setSelectedItem} updateImage={imageBody}/>}
                    

                

            </div>


            
        </>
    )
    
    
}