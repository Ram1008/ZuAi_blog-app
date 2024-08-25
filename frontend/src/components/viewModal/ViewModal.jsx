import { APP_Host } from '../../constants/appContants';
import './ViewModal.scss';

const ViewModal = ({ title, description, image, onClose }) => {

    const imageURL = `${APP_Host}/uploads/`;

    const handleOverlayClick = () => {
        onClose(false); 
    };
    
    return (
        <div className="viewmodal__overlay" onClick={handleOverlayClick}>
            <div className="viewmodal__container" onClick={(e) => e.stopPropagation()}>
                <div className="viewmodal__header">
                    <h2>{title}</h2>
                    <button className="close-btn" onClick={handleOverlayClick}>&times;</button>
                </div>
                <div className="viewmodal__body">
                    <img src={imageURL+image} alt={title} className="viewmodal__image" />
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;
