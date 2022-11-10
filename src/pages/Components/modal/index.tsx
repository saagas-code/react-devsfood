import css from './template.module.css'
import './modal.css'



type Props = {
    modalStatus: boolean
    setStatus: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

export const Modal = ({modalStatus, setStatus, children}: Props) => {
    
    const handleModalClick = (e: any) => {
        if(e.target.classList.contains('Container')) {
            setStatus(false)
        }
        //setModalData()

    }

    return (
        <div 
            onClick={handleModalClick}
            className='Container'
            style={modalStatus 
                ? {display:'flex'} 
                : {display:'none'}
            }
        >
            <div className={css.modalBody}>
                {children}
                
            </div>
        </div>
    )
}