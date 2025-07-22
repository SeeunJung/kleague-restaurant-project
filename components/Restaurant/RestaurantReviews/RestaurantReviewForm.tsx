'use client'
import Modal from '@/components/common/Modal'
import useForm from '@/hooks/useForm'
import useModal from '@/hooks/useModal'
import { useReviewStore } from '@/store/useReviewStore'
import { flexCol, flexRowICenter } from '@/styles/customStyle'
import { AxiosErrorRes } from '@/types/Axios'
import { ReviewFormType } from '@/types/Review'
import { cn } from '@/utils/cn'
import StarRating from './StarRating'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

type RestaurantReviewFormProps = {
  restaurantId: number
}

function RestaurantReviewForm({
  restaurantId,
}: RestaurantReviewFormProps) {
  const { form, handleInput, isFormValid, setField, resetForm } =
    useForm<ReviewFormType>({
      rating: 0,
      content: '',
    })
  const { modalOpen, setModalOpen, modalContent, openModal } =
    useModal()
  const { addReview } = useReviewStore()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await addReview({
        restaurantId,
        rating: form.rating,
        content: form.content,
      })
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
    } finally {
      setIsLoading(false)
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
        <StarRating
          rating={form.rating}
          onChange={(rating) => setField('rating', rating)}
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
      <Button
        onClick={() => handleSubmit()}
        disabled={!isFormValid || isLoading}
      >
        리뷰 등록
      </Button>
      <Modal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        contents={modalContent}
      />
    </div>
  )
}

export default RestaurantReviewForm
