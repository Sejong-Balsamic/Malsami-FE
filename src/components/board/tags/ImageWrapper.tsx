/* eslint-disable */

import Image from "next/image";

const ImageWrapper = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      alt="Image" // 기본 alt 텍스트
      width={16}
      height={14}
      className="inline-block"
    />
  );
};

export default ImageWrapper;
