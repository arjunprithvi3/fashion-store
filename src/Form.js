import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecordsList from './RecordsList'; // Import the RecordsList component

const Form = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateAge, setUpdateAge] = useState('');
  const [records, setRecords] = useState([]);
  const [showRecords, setShowRecords] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/data', { id, name, age });
      alert('Data inserted successfully');
      setId('');
      setName('');
      setAge('');
      setShowRecords(false);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/data/${deleteId}`);
      alert('Data deleted successfully');
      setDeleteId('');
      setShowRecords(false);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/data/${updateId}`, { name: updateName, age: updateAge });
      alert('Data updated successfully');
      setUpdateId('');
      setUpdateName('');
      setUpdateAge('');
      setShowRecords(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleShowRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setRecords(response.data);
      setShowRecords(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {showRecords && <RecordsList records={records} />}
      
      <button
        style={{
          padding: '8px 16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px',
          alignSelf: 'center',
          width: '100px',
        }}
        onClick={handleShowRecords}
      >
        Show Records
      </button>
      
      <h2>Add Record</h2>
      <form
        style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}
        onSubmit={handleSubmit}
      >
        <label style={{ marginBottom: '10px' }}>
          ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </label>
        <button
          type="submit"
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
        >
          Submit
        </button>
      </form>
      
      <h2>Delete Record</h2>
      <form
        style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}
        onSubmit={handleDelete}
      >
        <label style={{ marginBottom: '10px' }}>
          ID:
          <input
            type="text"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </label>
        <button
          type="submit"
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
        >
          Delete
        </button>
      </form>
      
      <h2>Update Record</h2>
      <form
        style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}
        onSubmit={handleUpdate}
      >
        <label style={{ marginBottom: '10px' }}>
          ID:
          <input
            type="text"
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
            style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </label>
        <label style={{ marginBottom: '10px' }}>
          New Name:
          <input
            type="text"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </label>
        <label style={{ marginBottom: '10px' }}>
          New Age:
          <input
            type="text"
            value={updateAge}
            onChange={(e) => setUpdateAge(e.target.value)}
            style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </label>
        <button
          type="submit"
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
        >
          Update
        </button>
      </form>
    </div>
  );
};


export default Form;
