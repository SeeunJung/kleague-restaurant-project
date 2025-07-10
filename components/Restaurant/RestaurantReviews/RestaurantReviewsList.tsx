import { flexCol } from '@/styles/customStyle'
import { Review } from '@/types/Review'
import RestaurantReviewContent from './RestaurantReviewContent'
import useModal from '@/hooks/useModal'
import Modal from '@/components/common/Modal'

type ReviewsListProps = {
  reviews: Review[]
}

function RestaurantReviewsList({ reviews }: ReviewsListProps) {
  const { modalOpen, setModalOpen, modalContent, openModal } =
    useModal()

  return (
    <div className={flexCol()}>
      {reviews.map((rev) => (
        <RestaurantReviewContent
          key={rev.id}
          review={rev}
          openModal={openModal}
        />
      ))}
      <Modal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        contents={modalContent}
      />
    </div>
  )
}

export default RestaurantReviewsList
