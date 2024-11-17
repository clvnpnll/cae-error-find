import { useState } from "react";

interface QuestionProps {
  question: string;
  choices: any[];
  onSubmit: (answer: any) => void;
}

const Question = ({
  question,
  choices = [],
  onSubmit,
}: QuestionProps) => {
  const [answer, setAnswer] = useState<any>();

  const handleSubmit = () => {
    onSubmit(answer);
    setAnswer(null);
  }

  return (
    <div className="flex flex-col">
      <div className="flex w-full px-12 py-8 border-y text-lg">{question}</div>
      <div className="flex w-full">
        {
          choices.map((choice, idx) => {
            return (
              <button 
                key={idx}
                className={
                  `flex w-full items-center uppercase justify-center p-8 border-b 
                  ${answer == choice.value ? "bg-white text-black" : "hover:bg-[#444]"}`
                }
                onClick={() => setAnswer(choice.value)}
              >{choice.label}</button>
            )
          })
        }
      </div>
      {answer != null && (
        <button 
          className="flex w-full px-20 py-4 mt-12 justify-start hover:bg-[#444]"
          onClick={handleSubmit} 
        >
          {"Next"}
        </button>
      )}
    </div>
  )
}

export default Question