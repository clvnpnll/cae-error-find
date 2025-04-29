import { ReactElement } from "react"

interface QuizHeaderProps {
    section: string
    title: string | ReactElement
}

export const QuizHeader = ({ section, title }: QuizHeaderProps) => {
    return (
      <>
        <div className='px-12 pt-8 uppercase font-bold text-xl'>{section}</div>
        <div className='px-12 py-12 font-bold text-6xl'>{title}</div>
      </>
    )
  }
  