import { QuestionMarkdown } from "./questionMarkdown";

interface QuestionProps {
  question: string;
  choices: any[];
  onSubmit: (answer: any) => void;
}

const Question = ({ question, choices = [], onSubmit }: QuestionProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full px-8 md:px-12 py-8 border-y text-lg bg-slate-50">
        <QuestionMarkdown question={question} />
      </div>
      <div className="flex w-full mb-12 flex-col md:flex-row">
        {choices.map((choice, idx) => {
          return (
            <button
              key={idx}
              className={`flex w-full items-center uppercase justify-center p-4 md:p-8 border-b font-bold hover:bg-slate-100 transition`}
              onClick={() => onSubmit(choice.value)}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
