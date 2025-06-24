import {
  flexColIJCenter,
  mainTitle,
  subTitle,
} from '@/styles/customStyle'

type AuthTitleProps = {
  subT: string
}

function AuthTitle({ subT }: AuthTitleProps) {
  return (
    <div className={flexColIJCenter('w-full', 'mb-6')}>
      <span className={mainTitle()}>⚽️ K리그 맛집 지도</span>
      <span className={subTitle()}>{subT}</span>
    </div>
  )
}

export default AuthTitle
