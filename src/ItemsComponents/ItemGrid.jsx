import { useEffect, useState } from "react"
import { getItem } from "../helpers/getItem";
import { useLocation, useNavigate } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "../../styles.css"
import { UserOutlined, LogoutOutlined, DeleteOutlined, EditOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { Avatar, Button, FloatButton, Image, Input, Modal, Space, message, notification } from "antd";


export const ItemGrid = () => {
    
    const [openModal, setOpenModal] = useState(false);

    const [openModal2, setOpenModal2] = useState(false);

    const [openModalinfo, setOpenModalinfo] = useState(false);


    const [selectedItem, setSelectedItem] = useState({
        id: 0,
        name: '',
        species: '',
        image: ''
    })

    const [items, setItem] = useState([]);

    const [DeleteItem, setDeleteItem] = useState([])

    const [copyitems, setCopyItem] = useState([]);

    const [RowSelected, setRowSelected] = useState(null)

    const [input, setInput] = useState("");

    const [inputEspecie, setinputEspecie] = useState("")

    const [inputImage, setinputImage] = useState("")

    const [messageApi, contexHolder] = message.useMessage();

    const navigate = useNavigate();

    const item = {
        id: items.length +1,
        name: input,
        species: inputEspecie,
        image: inputImage
    };

    const updateItem = {
        id: selectedItem?.id,
        name: input.trim() === '' ? selectedItem?.name : input,
        species: inputEspecie.trim() === '' ? selectedItem?.species : inputEspecie,
        image: selectedItem?.image
    };
    

    const user = useLocation().state?.data;

    



    const getitem = async() => {

        if(localStorage.getItem("data")){
            const newItem = await getItem();
            localStorage.setItem("data",JSON.stringify(newItem));
            setItem(JSON.parse(localStorage.getItem("data")));
            setCopyItem(JSON.parse(localStorage.getItem("data")));
        }else{
            const newItem = await getItem();
            setItem(newItem);
            setCopyItem(newItem);
        }
    }

    const deleteItem = (itemToDelete) => {

        const updatedItems = items.filter(item => item !== itemToDelete);
        setItem(updatedItems);
        setDeleteItem([...DeleteItem, itemToDelete]);
    }

    const AddItem = (itemNew) => {
        setItem([...items, itemNew])
    }

    const RecuperarItem = (itemRecuperar) => {
        setItem([...items, itemRecuperar])
        
        const updatedeleteItems = DeleteItem.filter(item => item != itemRecuperar);
        setDeleteItem(updatedeleteItems)
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

    const CloseSesion = () => {
        messageApi.open({
          type: 'loading',
          content: 'Cerrando sesión',
        });
      };


    const goBack = (event) => {
        event.preventDefault(); 
        CloseSesion();

        setTimeout(() => {
            navigate('/'); 
        }, 1000);

        
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

   
    const openNotificacionDelete = (itemdelete) =>{
        notification.open({
            message: 'Elemento Borrado',
            description: `Has eliminiada ha ${itemdelete.name}, de la especie ${itemdelete.species}.`,

        })
    }

    const openNotificacionRecuperar = (itemRecuperado) =>{
        notification.open({
            message: 'Elemento Recuperado',
            description: `Has recuperado ha ${itemRecuperado.name}, de la especie ${itemRecuperado.species}.`,

        })
    }
    






    const imageBody = (item) => {
               return (
        <>
            <Image.PreviewGroup>
                <Image src={item.image} alt={item.image} className="w-6rem shadow-2 border-round"/>
            </Image.PreviewGroup>
            
        </>)
        return ;
    }

    const buttonDeleteBody = (item) => {
        return <Button type="primary" className="bt-eliminar" onClick={() => {deleteItem(item); openNotificacionDelete(item);}} icon={<DeleteOutlined />}>Eliminar</Button>
    }


    const buttonRecuperaBody = (item) => {
        return <Button type="primary" className="bt-recuperar" onClick={() =>{RecuperarItem(item); openNotificacionRecuperar(item)}}>Recuperar</Button>
    }

    const headerRecuperado = () => {
        return <h1 className="header">Datos Borrados</h1>
    }

    const changeColor = (event) => {

        if (RowSelected != null && RowSelected.originalEvent != null) {

            RowSelected.originalEvent.target.style.background = "#f0f0f0"
        
        }

        setRowSelected(event)

        if (event.originalEvent != null) {
            event.originalEvent.target.style.background = '#ADD8E6';
        }

    }




    

    return (
        <>
            {contexHolder}
            <div className="card-grid">

                <div className="icon-perfil">
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>
                        <Avatar size="large" icon={<UserOutlined />} onClick={() => { setOpenModalinfo(true) }} />
                        </Space>
                    </Space>
                </div>
                <Modal title="Perfil" open={openModalinfo} onOk={() => setOpenModalinfo(false)} onCancel={() => setOpenModalinfo(false)} cancelButtonProps={{ style: { display: 'none' } }}>
                    <div className="modal-content">
                        <label className="user-tittle">Email</label>
                        <h2 className="user-desc">{user.Email}</h2>
                        <label className="pass-tittle">Password</label>
                        <h2 className="pass-desc">{user.password}</h2>
                        <Button type="primary" className="close-session-button" onClick={goBack} icon={<LogoutOutlined/>}>Cerrar sesión</Button>

                    </div>
                </Modal>


                

                
                <Input type="text" onChange={Buscador} prefix={<SearchOutlined />}></Input>

                    <DataTable value={items} selectionMode="single"  selection= {selectedItem} onSelectionChange={(e) =>{ setSelectedItem(e.value)}}
                     onRowClick={changeColor}>
                        
                        <Column field="name" header="Name"></Column>
                        <Column header="Image" body={imageBody}></Column>
                        <Column field="species" header="Species"></Column>
                        <Column header= "Eliminar" body={buttonDeleteBody}></Column>
                    </DataTable>
                

                    <Button type="primary" onClick={() => setOpenModal(true) } icon={<FormOutlined />}>Crear</Button>
                    <Modal title="Crear" open={openModal} onOk={() => {setOpenModal(false); AddItem(item)}} onCancel={() => setOpenModal(false)}>
                        <label>Nombre</label>
                        <Input type="text" placeholder="Nombre" onChange={(event) => setInput(event.target.value)} ></Input>
                        <label>Especies</label>
                        <Input type="text" placeholder="Especies" onChange={(event) => setinputEspecie(event.target.value)} ></Input>
                        <label>Imagen</label>
                        <Input type="text" placeholder="Imagen" onChange={(event) => setinputImage(event.target.value)} ></Input>
                    </Modal>


                    <Button type="primary" onClick={() =>{if (selectedItem != null) {setOpenModal2(true)}} } icon={<EditOutlined />}>Editar</Button>
                    {selectedItem !=null}<Modal title="Editar" open={openModal2} onOk={() => {setOpenModal2(false); EditItem(updateItem); items.map(item => {if (item.id === updateItem.id) {console.log(item);}}); RowSelected.originalEvent.target.style.background = '#f0f0f0';}} onCancel={() => {setOpenModal2(false); RowSelected.originalEvent.target.style.background = '#f0f0f0'; setSelectedItem(null)}}>
                        <label>Nombre</label>
                        <Input type="text" placeholder={selectedItem?.name} onChange={(event) => setInput(event.target.value)} ></Input>
                        <label>Especies</label>
                        <Input type="text" placeholder={selectedItem?.species} onChange={(event) => setinputEspecie(event.target.value)} ></Input>
                    </Modal>

                    <FloatButton.BackTop>+</FloatButton.BackTop> 

                    

                    <DataTable value={DeleteItem}  header={headerRecuperado}>
                        
                        <Column field="name" header="Name"></Column>
                        <Column header="Image" body={imageBody}></Column>
                        <Column field="species" header="Species"></Column>
                        <Column header= "Recuperar" body={buttonRecuperaBody}></Column>
                    </DataTable>

                    
                    

                  
                    

                

            </div>


            
        </>
    )
    
    
}