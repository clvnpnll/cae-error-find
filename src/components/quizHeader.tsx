import { ReactElement } from "react";

interface QuizHeaderProps {
  section: string;
  title: string | ReactElement;
}

export const QuizHeader = ({ section, title }: QuizHeaderProps) => {
  return (
    <>
      <div className="px-8 pt-4 md:px-12 md:pt-8 uppercase font-bold md:text-2xl text-lg">
        {section}
      </div>
      <div className="p-8 md:p-12 font-bold md:text-6xl text-4xl">{title}</div>
    </>
  );
};
