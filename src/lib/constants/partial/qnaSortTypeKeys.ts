import SortTypes from "../sortTypes";

// key값만 정의. key,value 값 모두를 저장하면 SortTypes와 동기화 안됨.
const QnaSortTypeKeys: Partial<typeof SortTypes> = {
  LATEST: SortTypes.LATEST,
  MOST_LIKED: SortTypes.MOST_LIKED,
  REWARD_YEOPJEON: SortTypes.REWARD_YEOPJEON,
  VIEW_COUNT: SortTypes.VIEW_COUNT,
};

export default QnaSortTypeKeys;
