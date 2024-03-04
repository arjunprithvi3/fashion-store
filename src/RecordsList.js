import React from 'react';

const RecordsList = ({ records }) => {
  return (
    <div style={styles.container}>
      <h2>Records:</h2>
      <div style={styles.listContainer}>
        <ul style={styles.list}>
          {records.map(record => (
            <li key={record._id} style={styles.listItem}>
              ID: {record._id} , NAME: {record.name} , AGE: {record.age}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  listContainer: {
    maxHeight: '200px',
    overflowY: 'auto',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    padding: '5px 10px',
    borderBottom: '1px solid #ccc',
  },
};

export default RecordsList;
