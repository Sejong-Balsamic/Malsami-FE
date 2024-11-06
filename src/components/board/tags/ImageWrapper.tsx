/* eslint-disable */

import Image from "next/image";

const ImageWrapper = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      alt="Image" // 기본 alt 텍스트
      width={12}
      height={12}
      className="inline-block"
    />
  );
};

export default ImageWrapper;
