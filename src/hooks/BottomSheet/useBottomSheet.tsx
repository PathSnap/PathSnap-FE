import React, { useEffect } from 'react';
import { FOOTER_HEIGHT, MAX_Y, MIN_Y } from '../../utils/BottomSheetOption';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: 'none' | 'down' | 'up';
  };
}

const useBottomSheet = () => {
  const sheet = React.useRef<HTMLDivElement>(null);
  const content = React.useRef<HTMLDivElement>(null);
  const metrics = React.useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      movingDirection: 'none',
    },
  });
  const [isContentAreaTouched, setIsContentAreaTouched] = React.useState(false);

  useEffect(() => {
    // 바텀시트가 움직일 수 있는지 판별
    const canUserMoveBottomSheet = () => {
      const { touchMove } = metrics.current;

      // 컨텐츠 영역을 터치한 경우 바텀시트를 움직이지 않음
      if (isContentAreaTouched) {
        return false;
      }

      // 바텀시트가 최대로 올라와있지 않음
      if (sheet.current!.getBoundingClientRect().y !== MIN_Y) {
        return true;
      }

      // 아래로 스크롤(위로 올림)했지만 더 이상 올라갈 수 없음 -> 바텀시트를 움직임
      // if (content.current && content.current.scrollTop <= 0) {
      //   return content.current!.scrollTop <= 0;
      // }

      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (currentTouch.clientY > touchMove.prevTouchY) {
        touchMove.movingDirection = 'down';
      }

      if (currentTouch.clientY < touchMove.prevTouchY) {
        touchMove.movingDirection = 'up';
      }

      if (canUserMoveBottomSheet()) {
        e.preventDefault(); // 바텀시트가 움직일 때 콘텐츠 스크롤을 막음

        // 드래그된 현재 Y 위치 - 처음 터치한 Y 위치
        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;

        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }
        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        sheet.current!.style.setProperty(
          'transform',
          `translateY(${nextSheetY - MAX_Y}px)`
        );
      } else {
        document.body.style.overflowY = 'hidden'; // 바텀시트가 아닌 곳을 터치하면 콘텐츠 스크롤 차단
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = 'auto';

      const { touchMove } = metrics.current;
      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      if (!isContentAreaTouched) {
        console.log('isContentAreaTouched', isContentAreaTouched);
        sheet.current!.style.transition = 'transform 0.3s ease';
        if (touchMove.movingDirection === 'down' && currentSheetY >= MIN_Y) {
          sheet.current!.style.setProperty('transform', 'translateY(0)');
        }

        if (
          touchMove.movingDirection === 'up' &&
          currentSheetY <= MAX_Y - FOOTER_HEIGHT
        ) {
          sheet.current!.style.setProperty(
            'transform',
            `translateY(${MIN_Y - MAX_Y + FOOTER_HEIGHT}px)`
          );
        }
      }

      // 애니메이션이 끝난 후 transition 속성을 제거
      const handleTransitionEnd = () => {
        sheet.current!.style.transition = '';
        sheet.current!.removeEventListener(
          'transitionend',
          handleTransitionEnd
        );
      };
      sheet.current!.addEventListener('transitionend', handleTransitionEnd);

      // metrics 초기화
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
      };
      // setIsContentAreaTouched(false);
    };
    const handleTouchStartContentArea = () => {
      console.log('content touched');
      setIsContentAreaTouched(true); // content 영역을 터치한 경우 바텀시트 이동 차단
    };

    const handleTouchStartOutside = (e: TouchEvent) => {
      if (!content.current?.contains(e.target as Node)) {
        setIsContentAreaTouched(false); // content 영역 외부를 터치한 경우 바텀시트 이동 가능
      }
    };

    sheet.current?.addEventListener('touchstart', handleTouchStart);
    sheet.current?.addEventListener('touchmove', handleTouchMove);
    sheet.current?.addEventListener('touchend', handleTouchEnd);
    content.current?.addEventListener(
      'touchstart',
      handleTouchStartContentArea
    );
    document.body.addEventListener('touchstart', handleTouchStartOutside);

    return () => {
      sheet.current?.removeEventListener('touchstart', handleTouchStart);
      sheet.current?.removeEventListener('touchmove', handleTouchMove);
      sheet.current?.removeEventListener('touchend', handleTouchEnd);
      content.current?.removeEventListener(
        'touchstart',
        handleTouchStartContentArea
      );
      document.body.removeEventListener('touchstart', handleTouchStartOutside);
    };
  }, []);

  return { sheet, content };
};

export default useBottomSheet;
