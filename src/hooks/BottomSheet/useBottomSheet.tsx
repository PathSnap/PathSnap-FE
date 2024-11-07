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
  isContentAreaTouched: boolean;
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
    isContentAreaTouched: false,
  });

  useEffect(() => {
    // 바텀시트가 움직일 수 있는 지 판별
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      // 컨텐츠 영역 아님 -> 바텀시트를 움직이는 영역
      if (!isContentAreaTouched) {
        return true;
      }

      // 바텀시트가 최대로 올라와있지 않음
      if (sheet.current!.getBoundingClientRect().y !== MIN_Y) {
        return true;
      }

      // 아래로 스크롤(위로 올림)했지만 더이상 올라갈 수 없음 -> 바텀시트를 움직임
      if (touchMove.movingDirection === 'down') {
        return content.current!.scrollTop <= 0;
      }

      // 위에 해당 없음 -> 바텀시트 움직임 X
      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      // touchStart.sheetY(바텀시트 최상단 y값)에 현재 바텀시트의 최상단 y값 저장
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      // 터치한 곳의 y값을 touchStart.touchY에 저장
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      // prevTouchY가 없으면 현재 터치한 곳의 y값을 저장
      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      // 앱을 처음 시작하면 prevTouchY가 0이므로 현재 터치한 곳의 y값을 저장
      if (touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      // 현재 터치한 곳의 y값이 이전 터치한 곳의 y값보다 아래(y값은 더 큼) -> down
      if (currentTouch.clientY > touchMove.prevTouchY) {
        touchMove.movingDirection = 'down';
      }

      // 현재 터치한 곳의 y값이 이전 터치한 곳의 y값보다 위(y값은 더 작음) -> up
      if (currentTouch.clientY < touchMove.prevTouchY) {
        touchMove.movingDirection = 'up';
      }

      if (canUserMoveBottomSheet()) {
        e.preventDefault();

        // 드래그된 현재 Y 위치 - 처음 터치한 Y 위치(이 값만큼 바텀시트를 이동해야 함)
        const touchOffset = currentTouch.clientY - touchStart.touchY;
        // 이동 후의 바텀시트의 최상단 y값
        let nextSheetY = touchStart.sheetY + touchOffset;
        console.log(nextSheetY);

        if (nextSheetY <= MIN_Y) {
          return (nextSheetY = MIN_Y);
        }
        if (nextSheetY >= MAX_Y) {
          return (nextSheetY = MAX_Y);
        }

        console.log('translate1');
        sheet.current!.style.setProperty(
          'transform',
          `translateY(${nextSheetY - MAX_Y}px)`
        );
      } else {
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = 'auto';
      const { touchMove } = metrics.current;

      //드래그 끝나고 바텀시트가 위치한 곳을 저장
      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      if (currentSheetY !== MIN_Y) {
        if (touchMove.movingDirection === 'down') {
          sheet.current!.style.setProperty('transform', 'translateY(0)');
          console.log('translate2');
        }

        if (touchMove.movingDirection === 'up') {
          sheet.current!.style.setProperty(
            'transform',
            `translateY(${MIN_Y - MAX_Y + FOOTER_HEIGHT}px)`
          );
          console.log('translate3');
        }
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
        isContentAreaTouched: false,
      };
    };
    sheet.current?.addEventListener('touchstart', handleTouchStart);
    sheet.current?.addEventListener('touchmove', handleTouchMove);
    sheet.current?.addEventListener('touchend', handleTouchEnd);

    return () => {
      sheet.current?.removeEventListener('touchstart', handleTouchStart);
      sheet.current?.removeEventListener('touchmove', handleTouchMove);
      sheet.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // 컨텐츠 영역 터치했을 때
  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current!.isContentAreaTouched = true;
    };
    content.current?.addEventListener('touchstart', handleTouchStart);

    return () => {
      content.current?.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return { sheet, content };
};

export default useBottomSheet;
