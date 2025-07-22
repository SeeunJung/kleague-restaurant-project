import { cardTitle, flexRowICenter } from '@/styles/customStyle'

type SectionTabsHeaderProps = {
  title: string
  children: React.ReactNode
}

function SectionTabsHeader({
  title,
  children,
}: SectionTabsHeaderProps) {
  return (
    <div className={flexRowICenter('justify-between')}>
      <div className={cardTitle('w-[6rem]', ' whitespace-nowrap')}>
        {title}
      </div>
      {children}
    </div>
  )
}

export default SectionTabsHeader
