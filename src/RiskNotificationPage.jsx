import React from 'react';

const RiskNotificationPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <div className="bg-gray-300 p-4 flex justify-end items-center space-x-6 text-black text-lg">
        <div className="ml-auto flex space-x-6">
          <span className="cursor-pointer hover:underline">ปค.4</span>
          <span className="cursor-pointer hover:underline">ปค.5</span>
          <span className="cursor-pointer hover:underline">แบบประเมิน 5 องค์ 17 หลักการ</span>
          <span className="cursor-pointer hover:underline">Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center h-[80vh]">
        <h1 className="text-4xl text-gray-600 font-semibold">ส่งข้อมูลแจ้งความเสี่ยง</h1>
      </div>
    </div>
  );
};

export default RiskNotificationPage;
