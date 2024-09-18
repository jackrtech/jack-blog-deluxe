
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteButton = ({ postId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/${postId}`);
      onDelete(); 
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  return (
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  );
};

DeleteButton.propTypes = {
  postId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
