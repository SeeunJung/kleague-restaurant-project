import { Button } from '@/components/ui/button'
import { mainTitle } from '@/styles/customStyle'
import { useRouter } from 'next/navigation'

function ReviewBlurMode() {
  const router = useRouter()
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="text-center">
        <div className={mainTitle('mb-4')}>
          리뷰를 보려면 로그인이 필요합니다
        </div>
        <Button
          onClick={() => {
            router.push('/login')
          }}
        >
          로그인 하러 가기
        </Button>
      </div>
    </div>
  )
}

export default ReviewBlurMode
