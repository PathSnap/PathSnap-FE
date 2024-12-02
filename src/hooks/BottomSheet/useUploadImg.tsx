import { useState } from 'react';

const useUploadImg = (callback: (imageUrls: string[]) => void) => {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      const currentFormData = formData || new FormData();

      const readFiles = Array.from(files).map((file) => {
        return new Promise<{ file: File; url: string }>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ file, url: reader.result as string });
          reader.onerror = () => reject('File read failed');
          reader.readAsDataURL(file);
        });
      });

      try {
        const newFiles = await Promise.all(readFiles);

        // 화면에 보여주기 위한 urls
        const newPhotoUrls = newFiles.map((file) => file.url);
        setPhotoUrls((prevUrls) => {
          const updatedUrls = [...prevUrls, ...newPhotoUrls];
          callback(updatedUrls);
          return updatedUrls;
        });

        // S3로 보내기 위해 formData에 저장
        newFiles.forEach(({ file }) => {
          currentFormData.append('images', file);
        });

        setFormData(currentFormData);
      } catch (error) {
        console.error('File reading error:', error);
      }
    }
  };

  return {
    photoUrls,
    setPhotoUrls,
    handleFileChange,
    formData,
  };
};

export default useUploadImg;
