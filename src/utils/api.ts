import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Axios 인스턴스 생성
export const baseApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 환경 변수에서 API URL 가져오기
  withCredentials: true, // CORS 요청 시 쿠키 포함
  headers: {
    accept: 'application/json', // 기본 accept 헤더 설정
  },
});

// 요청 인터셉터
baseApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // 로컬스토리지에서 accessToken 가져오기

    // Authorization 헤더 추가
    if (accessToken) {
      config.headers.access = accessToken;
    }

    return config;
  },
  (error) => {
    console.error('요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

// baseApi.interceptors.response.use(
//   async (response) => {
//     // 302 상태 코드 처리
//     if (response.status === 302) {
//       try {
//         const res = await baseApi.post('/reissue', null); // 토큰 갱신 요청
//         const newAccessToken = res.data.accessToken;

//         // 새로운 Access Token 저장 및 요청 헤더 갱신
//         localStorage.setItem('accessToken', newAccessToken);

//         // 원래 요청 복구 및 재시도
//         const originalRequest = response.config;
//         originalRequest.headers.access = newAccessToken;
//         return baseApi.request(originalRequest);
//       } catch (error) {
//         console.error('302 상태에서 토큰 갱신 실패:', error);
//         return Promise.reject(error); // 에러 처리
//       }
//     }

//     return response; // 성공 응답 그대로 반환
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // 401 상태 코드 처리 (토큰 갱신)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const res = await baseApi.post('/reissue');
//         const newAccessToken = res.data.accessToken;

//         // 새로운 Access Token 저장 및 요청 헤더 갱신
//         localStorage.setItem('accessToken', newAccessToken);
//         originalRequest.headers.access = newAccessToken;

//         // 원래 요청 재시도
//         return baseApi.request(originalRequest);
//       } catch (tokenError) {
//         console.error('401 상태에서 토큰 갱신 실패:', tokenError);
//         return Promise.reject(tokenError);
//       }
//     }

//     console.error('응답 인터셉터 에러:', error);
//     return Promise.reject(error);
//   }
// );

// API 호출 객체
export const api = {
  // GET 요청
  get: async <T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    const response = await baseApi.get<T>(endpoint, config);
    return response.data;
  },

  // POST 요청
  post: async <T>(
    endpoint: string,
    data: any = null,
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    const response = await baseApi.post<T>(endpoint, data, config);
    return response.data;
  },

  // PATCH 요청
  patch: async <T>(
    endpoint: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    const response = await baseApi.patch<T>(endpoint, data, config);
    return response.data;
  },

  // PUT 요청
  put: async <T>(
    endpoint: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    const response = await baseApi.put<T>(endpoint, data, config);
    return response.data;
  },

  // DELETE 요청
  delete: async <T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    const response = await baseApi.delete<T>(endpoint, config);
    return response.data;
  },
};
