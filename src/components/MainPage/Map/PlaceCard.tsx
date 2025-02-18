import React from 'react';

type PlaceCardProps = {
  name: string;
  description: string;
  date: string;
  imageUrl: string;
};

const PlaceCard: React.FC<PlaceCardProps> = ({
  name,
  description,
  date,
  imageUrl,
}) => {
  return (
    <div className="flex h-[122px] w-full items-center justify-center rounded-[16px] bg-[#FFFFFF] shadow-md">
      <div className="flex flex-row-reverse items-center gap-9">
        {/* 이미지 영역 */}
        <div className="h-[94px] w-[94px] flex-shrink-0">
          <img
            src={imageUrl}
            alt="장소 이미지"
            className="h-full w-full rounded-[10px] object-cover"
          />
        </div>
        {/* 콘텐츠 영역 */}
        <div className="flex h-[94px] w-[206px] flex-col justify-between">
          {/* 장소이름 */}
          <h2 className="text-[14px] font-bold text-[#77CEBD]">{name}</h2>
          {/* 설명 */}
          <p className="text-[12px] leading-tight text-[#595959]">
            {description}
          </p>
          {/* 날짜 */}
          <span className="text-[12px] text-[#595959]">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
