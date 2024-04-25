import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export default function Modal({ children, onClose,open, cssClass = '' }) {
    const dialog = useRef();
    useEffect(() => {
        const modal=dialog.current
        if (open) {
            modal.showModal()
        } 
        return ()=>{modal.close()}
    }, [open])

    //onClose is triggered when user tries to close the modal via esc key. in that case once the modal is closed use is not able to open it again
    return createPortal(
        <dialog ref={dialog} className={`modal ${cssClass}`} onClose={onClose}>
            {children}
        </dialog>, document.getElementById('modal'))
}