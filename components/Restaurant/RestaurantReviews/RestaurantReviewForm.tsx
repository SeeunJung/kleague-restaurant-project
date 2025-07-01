'use client'
import Modal from '@/components/common/Modal'
import CustomSelectInput from '@/components/CustomSelectInput'
import useForm from '@/hooks/useForm'
import useModal from '@/hooks/useModal'
import { createReview } from '@/services/review'
import { button, flexCol, flexRowICenter } from '@/styles/customStyle'
import { AxiosErrorRes } from '@/types/Axios'
import { Review } from '@/types/Restaurant'
import { cn } from '@/utils/cn'

type RestaurantReviewFormProps = {
  restaurantId: number
  onReviewSubmit: (newReview: Review) => void
}

type ReviewFormType = {
  rating: string
  content: string
}

function RestaurantReviewForm({
  restaurantId,
  onReviewSubmit,
}: RestaurantReviewFormProps) {
  const { form, handleInput, isFormValid, resetForm } =
    useForm<ReviewFormType>({
      rating: '',
      content: '',
    })
  const { modalOpen, setModalOpen, modalContent, openModal } =
    useModal()

  const handleSubmit = async () => {
    try {
      const newReview = await createReview({
        restaurantId,
        rating: parseInt(form.rating),
        content: form.content,
      })
      onReviewSubmit(newReview)
      resetForm()
      openModal({
        isError: true,
        title: '리뷰 작성 성공',
        description: '리뷰 작성에 성공했습니다.',
      })
    } catch (e: unknown) {
      const err = e as AxiosErrorRes
      openModal({
        isError: true,
        title: '리뷰 작성 실패',
        description:
          err?.response?.data?.message ||
          '리뷰 작성 도중 오류가 발생했습니다.',
      })
    }
  }

  return (
    <div
      className={flexCol(
        'w-full',
        'bg-gray-100',
        'rounded-xl',
        'p-3',
      )}
    >
      <div className={cn('text-sm', 'font-semibold')}>리뷰 작성</div>
      <div className={flexRowICenter()}>
        <span
          className={cn('text-xs', 'text-[#374151]', 'text-nowrap')}
        >
          평점:{' '}
        </span>
        <CustomSelectInput
          placeholder="평점을 선택하세요"
          name="rating"
          value={form.rating}
          onChange={handleInput}
          options={['5점', '4점', '3점', '2점', '1점']}
        />
      </div>
      <textarea
        name="content"
        value={form.content}
        onChange={handleInput}
        className={cn(
          'bg-white',
          'rounded-xl',
          'w-full',
          'resize-none',
          'p-4',
          'border',
          'border-[#ccc]',
        )}
        placeholder="맛집에 대한 솔직한 리뷰를 남겨주세요"
      ></textarea>
      <button
        onClick={() => handleSubmit()}
        className={button()}
        disabled={!isFormValid}
      >
        리뷰 등록
      </button>
      <Modal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        contents={modalContent}
      />
    </div>
  )
}

export default RestaurantReviewForm
