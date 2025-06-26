import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'

type ModalProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  contents: {
    isError: boolean
    title: string
    description: string
    onBtnClick?: () => void
  }
}

function Modal({ isOpen, onOpenChange, contents }: ModalProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{contents.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {contents.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {contents.isError && (
            <AlertDialogCancel>창 닫기</AlertDialogCancel>
          )}
          {!contents.isError && (
            <AlertDialogAction onClick={contents.onBtnClick}>
              이동
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Modal
