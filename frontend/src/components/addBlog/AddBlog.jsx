import { useState, useContext } from 'react';
import blogContext from '../../contexts/blog/blogContext';
import './addBlog.scss';

const AddBlog = ({ onClose }) => {
    const { addABlog } = useContext(blogContext);
    
    const [newBlog, setNewBlog] = useState({
        title: "",
        description: "",
        image: ""
    });
    const [previewImage, setPreviewImage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBlog({
            ...newBlog,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setNewBlog({
                    ...newBlog,
                    image: file, 
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const { title, description, image } = newBlog;
        await addABlog(title, description, image);
        onClose(false);
    };

    return (
        <div className="modal__overlay" onClick={onClose}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2>Add Blog</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal__body">
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={newBlog.title}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={newBlog.description}
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
                    <button type="button" onClick={handleSubmit}>Add Blog</button>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;
