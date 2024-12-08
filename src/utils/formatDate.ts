export const formattedDate = () => {
  const now = new Date(Date.now());
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const calculateTime = (startTime: string, endTime: string): string => {
  const formattedStartTime: string = startTime.replace(' ', 'T');
  const formattedEndTime: string = endTime.replace(' ', 'T');

  const startDate: Date = new Date(formattedStartTime);
  const endDate: Date = new Date(formattedEndTime);

  const diffInMilliseconds: number = endDate.getTime() - startDate.getTime();

  const diffInMinutes: number = Math.floor(diffInMilliseconds / 1000 / 60);
  const diffInHours: number = Math.floor(diffInMinutes / 60);
  const remainingMinutes: number = diffInMinutes % 60;

  return diffInHours === 0
    ? `${remainingMinutes}분`
    : `${diffInHours}시간 ${remainingMinutes}분`;
};

export const formattedTime = (time: string): string => {
  const [hour, minute] = time.split(':').map((part) => parseInt(part));

  let period = '오전';
  let formattedHour = hour;

  if (hour >= 12) {
    period = '오후';
    formattedHour = hour === 12 ? 12 : hour - 12;
  }

  return `${period} ${formattedHour}:${minute.toString().padStart(2, '0')}`;
};

export const formattedRealTime = (): string => {
  const timeStamp = new Date();
  const formattedTimeStamp = `${timeStamp.getFullYear()}-${String(
    timeStamp.getMonth() + 1
  ).padStart(2, '0')}-${String(timeStamp.getDate()).padStart(2, '0')} ${String(
    timeStamp.getHours()
  ).padStart(
    2,
    '0'
  )}:${String(timeStamp.getMinutes()).padStart(2, '0')}:${String(
    timeStamp.getSeconds()
  ).padStart(2, '0')}`;

  console.log(formattedTimeStamp);
  return formattedTimeStamp;
};
