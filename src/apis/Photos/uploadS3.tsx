import { api } from '../../utils/api';

const uploadS3 = async (formData: FormData | null) => {
  try {
    console.log(formData);
    const res: any = await api.post('/images', formData);
    console.log('S3 업로드 성공:', res.data);
  } catch (error) {
    console.error('S3 업로드 실패:', error);
  }
};

export default uploadS3;
