import AssignedTag from "@/components/board/tags/AssignedTag";
import ResolvedTag from "@/components/board/tags/ResolvedTag";
import QuestionCard from "@/components/board/tags/question/QuestionCard";

export default function QuestionBoardPage() {
  return (
    <div>
      <div>quesiton board page</div>
      <AssignedTag label="지정태그" />
      <AssignedTag label="지정태그2" />
      <AssignedTag label="지정태그" />
      <AssignedTag label="지정태그2" />
      <AssignedTag label="지정태그" />
      <AssignedTag label="지정태그2" />

      <AssignedTag label="지정태그" />
      <AssignedTag label="지정태그2" />
      <ResolvedTag />

      <br />
      <br />
    </div>
  );
}
