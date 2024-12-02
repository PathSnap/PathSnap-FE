// storageUtils.ts
export interface SearchRecord {
  locationName: string;
  date: string;
}

const STORAGE_KEY = 'searchRecords';

export const saveToLocalStorage = (
  locationName: string,
  date: string
): void => {
  const previousRecords: SearchRecord[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]'
  );
  const newRecord: SearchRecord = { locationName, date };
  const updatedRecords = [newRecord, ...previousRecords].slice(0, 10); // 최대 10개 기록 유지
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
};

export const getFromLocalStorage = (): SearchRecord[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const deleteFromLocalStorage = (index: number): void => {
  const records: SearchRecord[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]'
  );
  records.splice(index, 1); // 특정 인덱스의 기록 삭제
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};
