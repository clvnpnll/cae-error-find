/* eslint-disable @typescript-eslint/no-unused-vars */
import Markdown from "react-markdown";

export const QuestionMarkdown = ({ question }: { question: string }) => {
  return (
    <Markdown
      components={{
        em(props) {
          const { node, ...rest } = props;
          return <strong {...rest} />;
        },
      }}
    >
      {question}
    </Markdown>
  );
};
