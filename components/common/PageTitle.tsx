import {
  flexColIJCenter,
  mainTitle,
  subTitle,
} from '@/styles/customStyle'

type PageTitleProps = {
  mainT?: string
  subT: string
}

function PageTitle({
  mainT = '⚽️ K리그 맛집 지도',
  subT,
}: PageTitleProps) {
  return (
    <div className={flexColIJCenter('w-full', 'mb-6')}>
      <span className={mainTitle()}>{mainT}</span>
      <span className={subTitle()}>{subT}</span>
    </div>
  )
}

export default PageTitle
