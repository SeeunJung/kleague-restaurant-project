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
      <div className={cardTitle()}>{title}</div>
      {children}
    </div>
  )
}

export default SectionTabsHeader
