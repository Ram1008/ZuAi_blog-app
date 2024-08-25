import { useState } from 'react';
import './post.scss';
import ViewModal from '../viewModal/ViewModal';
import { APP_Host } from '../../constants/appContants';

const Post = ({ title, description, image }) => {
    
    const [showViewModal, setShowViewModal] = useState(false);
    const imageURL = `${APP_Host}/uploads/`;

    const truncate = (text) => {
        const words = text.split(' ');
        const truncatedText = words.slice(0, 19).join(' ');
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
    

    return (
        <div className='post_container'>
            <div className='post_title'>{title}</div>
            <div className='post_body'>
                <img src={imageURL+image} alt={title} />
                <div>
                    {truncate(description)}
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
