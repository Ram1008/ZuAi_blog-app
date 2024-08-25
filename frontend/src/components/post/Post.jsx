import { useState } from 'react';
import './post.scss';
import ViewModal from '../viewModal/ViewModal';

const Post = ({ title, description, image }) => {
    const [showViewModal, setShowViewModal] = useState(false);
    const host = 'http://localhost:5000/uploads/';
    const getFirst14Words = (text) => {
        const words = text.split(' ');
        return words.slice(0, 14).join(' ') + (words.length > 14 ? '...' : '');
    };

    return (
        <div className='post_container'>
            <img src={host+image} alt={title} />
            <div>
                <div className='post_title'>{title}</div>
                <div>
                    {getFirst14Words(description)}
                    <span 
                        style={{ fontWeight: '700', fontSize: '12px', cursor: 'pointer' }} 
                        onClick={() => setShowViewModal(true)}
                    >
                        Read more
                    </span>
                </div>
            </div>
            {showViewModal && (
                <ViewModal 
                    title={title} 
                    description={description} 
                    image={image}
                    onClose={() => setShowViewModal(false)} 
                />
            )}
        </div>
    );
}

export default Post;
