import { useEffect, useRef, useState } from 'react';
import { MAX_Y, MIN_Y } from '../../utils/BottomSheetOption';
import useRouteRecordStore from '../../stores/RouteRecord';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'up'; // 유저가 터치를 움직이고 있는 방향
  };
}

export function useBottomSheet() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const recordingInfo = useRouteRecordStore((state) => state.recordingInfo);
  const [canHandleBottomSheet, setCanHandleBottomSheet] = useState(false);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
  });

  useEffect(() => {
    // 기록 중일 때만 바텀시트 열리도록
    if (
      !recordingInfo.isRecording &&
      !recordingInfo.isSerching &&
      !canHandleBottomSheet
    )
      return;

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;

      touchStart.sheetY = headerRef.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (!touchMove.prevTouchY) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down';
        setIsBottomSheetOpen(false);
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up';
        setIsBottomSheetOpen(true);
      }

      const touchOffset = currentTouch.clientY - touchStart.touchY;
      let nextSheetY = touchStart.sheetY + touchOffset;

      if (nextSheetY <= MIN_Y) {
        nextSheetY = MIN_Y;
      }

      if (nextSheetY >= MAX_Y) {
        nextSheetY = MAX_Y;
      }

      sheetRef.current!.style.setProperty(
        'transform',
        `translateY(${nextSheetY - MAX_Y}px)`
      );
    };
    const handleTouchEnd = () => {
      const { touchMove } = metrics.current;

      const currentSheetY = headerRef.current!.getBoundingClientRect().y;

      if (currentSheetY !== MIN_Y) {
        // 닫기
        if (touchMove.movingDirection === 'down') {
          sheetRef.current!.style.setProperty('transform', 'translateY(0)');
          setIsBottomSheetOpen(false);
        }
        // 열기
        if (touchMove.movingDirection === 'up') {
          sheetRef.current!.style.setProperty(
            'transform',
            `translateY(-${MAX_Y - MIN_Y}px)`
          );
          setIsBottomSheetOpen(true);
        }
      }

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
    };

    headerRef.current?.addEventListener('touchstart', handleTouchStart);
    headerRef.current?.addEventListener('touchmove', handleTouchMove);
    headerRef.current?.addEventListener('touchend', handleTouchEnd);

    if (isBottomSheetOpen) {
      sheetRef.current!.style.setProperty(
        'transform',
        `translateY(-${MAX_Y - MIN_Y}px)`
      );
    }

    return () => {
      headerRef.current?.removeEventListener('touchstart', handleTouchStart);
      headerRef.current?.removeEventListener('touchmove', handleTouchMove);
      headerRef.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [recordingInfo.isSerching, recordingInfo.isRecording, isBottomSheetOpen]);

  return {
    sheetRef,
    headerRef,
    isBottomSheetOpen,
    setIsBottomSheetOpen,
    setCanHandleBottomSheet,
  };
}
