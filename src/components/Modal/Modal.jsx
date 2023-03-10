import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import modalStyles from './modal.module.css'

function ModalInner({ closeHandler, children }) {
  useEffect(() => {
    const closeModalByEscape = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }
    document.addEventListener('keydown', closeModalByEscape)

    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
    }
  }, [])

  const closeModalByClickButton = () => {
    closeHandler()
  }

  return (
    <div className={modalStyles.modalInner}>
      <button
        type="button"
        onClick={closeModalByClickButton}
        className={modalStyles.closeBtn}
      >
        <i className="fa-solid fa-rectangle-xmark" />
      </button>
      {children}
    </div>
  )
}

export function Modal({ isOpen, closeHandler, children }) {
  if (!isOpen) return null
  const closeModalByClickWrapper = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onMouseDown={closeModalByClickWrapper} className={modalStyles.modalWr}>
      <ModalInner closeHandler={closeHandler}>{children}</ModalInner>
    </div>,
    document.getElementById('modal-root'),
  )
}
