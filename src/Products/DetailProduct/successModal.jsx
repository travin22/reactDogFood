import { Modal } from '../../components/Modal/Modal'

export function SuccessModal({
  setIsSuccessModalOpen, isOpen, action,
}) {
  const closeSuccessModalHandler = () => {
    setIsSuccessModalOpen(false)
  }
  return (
    <Modal isOpen={isOpen} closeHandler={closeSuccessModalHandler}>
      <b>
        {`Вы успешно ${action} товар!`}
      </b>
    </Modal>
  )
}
