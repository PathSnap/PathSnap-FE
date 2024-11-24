import { useState } from 'react';
import IconArrowLeft from '../icons/IconArrowLeft'; // IconArrowLeft 아이콘 가져오기
import IconSearch from '../icons/IconSerch'; // IconSearch 아이콘 가져오기

const SerchPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    alert(`You searched for: ${inputValue}`);
  };

  const handleBackClick = () => {
    alert('Back button clicked!'); // 이곳에 뒤로 가기 동작 추가
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* 상단 검색 바 */}
      <div className="w-full flex items-center px-4 py-2 border-b border-gray-300">
        <button onClick={handleBackClick} className="mr-4">
          <IconArrowLeft width={24} height={24} color="black" />
        </button>
        <div className="flex items-center bg-gray-100 rounded-full flex-grow px-4 py-2">
          <input
            type="text"
            placeholder="주소 입력"
            value={inputValue}
            onChange={handleChange}
            className="bg-transparent flex-grow focus:outline-none"
          />
          <button onClick={handleSubmit}>
            <IconSearch width={20} height={20} color="black" />
          </button>
        </div>
      </div>

      {/* 기존 내용 */}
      <div className="mt-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Search Page</h1>
        <input
          type="text"
          placeholder="Type your search..."
          value={inputValue}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SerchPage;
