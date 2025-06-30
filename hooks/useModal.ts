import { Optional } from '@/@types/functions'
import { IModalType } from '@/types/Modal'
import { useState } from 'react'

function useModal() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<IModalType>({
    isError: false,
    title: '',
    description: '',
    onBtnClick: () => {},
  })

  const openModal = (content: Optional<IModalType, 'onBtnClick'>) => {
    setModalContent({
      ...content,
      onBtnClick: content.onBtnClick || (() => setModalOpen(false)),
    })
    setModalOpen(true)
  }

  return { modalOpen, setModalOpen, modalContent, openModal }
}

export default useModal
