import React from 'react';
import './deleteModal.scss'; 

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <div className='delete_confirmation_modal'>
            <div className='modal_content'>
                <p>Are you sure you want to delete this post?</p>
                <button onClick={onConfirm} className='confirm_button'>Yes, Delete</button>
                <button onClick={onCancel} className='cancel_button'>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
