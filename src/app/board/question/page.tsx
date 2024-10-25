import AssignedTag from "@/components/board/tags/AssignedTag";
import ResolvedTag from "@/components/board/tags/ResolvedTag";
import getDateDiff from "@/utils/getDateDiff";

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

      <span>{getDateDiff("2024-10-25T01:59:43.934Z")}</span>
      <br />
      <br />
    </div>
  );
}
