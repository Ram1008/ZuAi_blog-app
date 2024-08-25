import { useState, useContext } from 'react';
import './MyBlog.scss';
import EditBlogModal from '../modal/EditModal';
import ViewModal from '../viewModal/ViewModal';
import DeleteConfirmationModal from '../deleteModal/DeleteModal'; // Import the new modal
import blogContext from '../../contexts/blog/blogContext'; 

const MyBlog = ({ id, title, description, image }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for delete confirmation modal
    const host = 'http://localhost:5000/uploads/';

    const { deleteABlog } = useContext(blogContext); // Get delete function from context

    const getFirst14Words = (text) => {
        const words = text.split(' ');
        return words.slice(0, 14).join(' ') + (words.length > 14 ? '...' : '');
    };

    const handleDelete = async () => {
        await deleteABlog(id); 
        setShowDeleteConfirmation(false); 
    };

    return (
        <div className='post_container'>
            <img src={host+image} alt={title} />
            <div>
                <div className='post_header'>
                    <h2>{title}</h2>
                    <div>
                        <button 
                            onClick={() => setShowEditModal(true)} 
                            className='post_edit-button'
                        />
                        <button 
                            className='post_delete-button'
                            onClick={() => setShowDeleteConfirmation(true)} 
                        />
                    </div>
                </div>
                <div>
                    {getFirst14Words(description)}
                    <span 
                        style={{ fontWeight: 'bold', cursor: 'pointer' }} 
                        onClick={() => setShowViewModal(true)}
                    >
                        ... Read more
                    </span>
                </div>
            </div>
            {showEditModal && (
                <EditBlogModal 
                    id={id}
                    title={title} 
                    description={description} 
                    image={image}
                    onClose={() => setShowEditModal(false)} 
                />
            )}
            {showViewModal && (
                <ViewModal 
                    title={title} 
                    description={description} 
                    image={image}
                    onClose={() => setShowViewModal(false)} 
                />
            )}
            {showDeleteConfirmation && (
                <DeleteConfirmationModal 
                    onConfirm={handleDelete} 
                    onCancel={() => setShowDeleteConfirmation(false)}
                />
            )}
        </div>
    );
}

export default MyBlog;
