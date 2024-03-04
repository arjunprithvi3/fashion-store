import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';


function FirebaseFirestore() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [id, setId] = useState('');
    const [show, setShow] = useState(false);
   const [val, setVal] = useState([]);

    const value = collection(database, "demo");

    useEffect(() => {
        const getData = async () => {
            const dbVal = await getDocs(value);
            setVal(dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }
        getData();
    }, []);

    const handleCreate = async () => {
        await addDoc(value, { name1: fname, name2: lname });
        setFname("");
        setLname("");
    }

    const handleDelete = async (id) => {
        const deleteVal = doc(database, "demo", id);
        await deleteDoc(deleteVal);
    }

    const handleEdit = async (id, name1, name2) => {
        setFname(name1);
        setLname(name2);
        setId(id);
        setShow(true);
    }

    const handleUpdate = async () => {
        const updateData = doc(database, "demo", id);
        await updateDoc(updateData, { name1: fname, name2: lname });
        setShow(false);
        setFname("");
        setLname("");
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className='container' style={{ textAlign: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                <input
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <br />
                <input
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <br />
                {!show ? <button onClick={handleCreate} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create</button> :
                    <button onClick={handleUpdate} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update</button>}
                <div>
                    {
                        val.map(values =>
                            <div key={values.id} style={{ marginTop: '20px' }}>
                                <h1>{values.name1}</h1>
                                <h1>{values.name2}</h1>
                                <button onClick={() => handleDelete(values.id)} style={{ padding: '8px 16px', backgroundColor: 'red', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>Delete</button>
                                <button onClick={() => handleEdit(values.id, values.name1, values.name2)} style={{ padding: '8px 16px', backgroundColor: 'green', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default FirebaseFirestore;
