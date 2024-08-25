import { useState, useContext } from 'react';
import './MyBlog.scss';
import EditBlogModal from '../modal/EditModal';
import ViewModal from '../viewModal/ViewModal';
import DeleteConfirmationModal from '../deleteModal/DeleteModal';
import blogContext from '../../contexts/blog/blogContext'; 
import { APP_Host } from '../../constants/appContants';

const MyBlog = ({ id, title, description, image }) => {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const imageURL = `${APP_Host}/uploads/`;

    const { deleteABlog } = useContext(blogContext); 

    const truncate = (text) => {
        const words = text.split(' ');
        const truncatedText = words.slice(0, 20).join(' ');
        return (
            <div>
                {truncatedText}
                {words.length > 14 && (
                    <span 
                        onClick={() => setShowViewModal(true)} 
                        style={{ fontWeight: '700', fontSize: '12px', cursor: 'pointer', marginLeft: '4px' }}
                    >
                        ...Read more
                    </span>
                )}
            </div>
        );
    };

    const handleDelete = async () => {
        await deleteABlog(id); 
        setShowDeleteConfirmation(false); 
    };

    return (
        <div className='post_container'>
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
            <div className='post_body'>
                
                <img src={imageURL+image} alt={title} />
                <div>
                    {truncate(description)}
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
