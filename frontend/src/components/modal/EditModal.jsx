import { useContext, useState } from 'react';
import './editModal.scss';
import blogContext from '../../contexts/blog/blogContext';

const EditModal = ({ id, title, description, image, onClose }) => {

    const { updateABlog } = useContext(blogContext);
    const [updatedBlog, setUpdatedBlog] = useState({
        title,
        description,
        image
    });
    const [previewImage, setPreviewImage] = useState(image);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBlog({
            ...updatedBlog,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setUpdatedBlog({
                    ...updatedBlog,
                    image: file, 
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        updateABlog(id, updatedBlog.title, updatedBlog.description, updatedBlog.image);
        onClose(false);
    };

    return (
        <div className="modal__overlay" onClick={onClose}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2>Edit Blog</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal__body">
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={updatedBlog.title}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={updatedBlog.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Upload Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="modal__image-preview"
                        />
                    )}
                </div>
                <div className="modal__footer">
                    <button type="button" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
