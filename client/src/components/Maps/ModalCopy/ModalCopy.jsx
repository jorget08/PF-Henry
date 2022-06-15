import './Modal.css'

const Modal = ({children, isOpen, closeModal}) => {
    const handleContainerClick = (e) => e.stopPropagation();

 return (
    <article className={`modall ${isOpen && "is-openn"}`} onClick={closeModal}>
        <div className='modal-containerr' onClick={handleContainerClick}>            
            <button className='modal-closee' onClick={closeModal}>X</button>
            {children}
        </div>
    </article>
 )
};

export default Modal;