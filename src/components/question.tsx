import { useState } from "react";
import Markdown from 'react-markdown'
import Button from "./button";

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
      <div className="flex w-full px-12 py-8 border-y text-lg bg-slate-50">
        <Markdown components={{
          em(props) {
            const {node, ...rest} = props
            return <strong {...rest} />
          }
        }}>{question}</Markdown>
      </div>
      <div className="flex w-full mb-12">
        {
          choices.map((choice, idx) => {
            return (
              <button 
                key={idx}
                className={
                  `flex w-full items-center uppercase justify-center p-8 border-b font-bold 
                  ${answer == choice.value ? "bg-slate-200" : "hover:bg-slate-100"}`
                }
                onClick={() => setAnswer(choice.value)}
              >{choice.label}</button>
            )
          })
        }
      </div>
      {answer != null && (
        <Button label="Next" align="center" onClick={handleSubmit} />
      )}
    </div>
  )
}

export default Question