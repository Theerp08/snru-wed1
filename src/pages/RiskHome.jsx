import React from "react";
import RiskCard from "../components/RiskCard";

const RiskHome = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ระบบส่งข้อมูลความเสี่ยง</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + ส่งข้อมูลความเสี่ยงใหม่
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <RiskCard title="ส่งแล้ว" count={12} color="border-green-500" />
        <RiskCard title="กำลังดำเนินการ" count={5} color="border-yellow-400" />
        <RiskCard title="เสร็จสิ้น" count={8} color="border-blue-500" />
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="ค้นหารายการความเสี่ยง..."
          className="w-full md:w-1/3 p-2 border rounded-md"
        />
      </div>

      {/* Risk Table */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">รหัส</th>
              <th className="px-4 py-2">วันที่ส่ง</th>
              <th className="px-4 py-2">ประเภท</th>
              <th className="px-4 py-2">สถานะ</th>
              <th className="px-4 py-2">ผู้ส่ง</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">R-0012</td>
              <td className="px-4 py-2">25 พ.ค. 2568</td>
              <td className="px-4 py-2">ความเสี่ยงด้านความปลอดภัย</td>
              <td className="px-4 py-2 text-yellow-600">กำลังดำเนินการ</td>
              <td className="px-4 py-2">นพ.สมชาย</td>
            </tr>
            {/* สามารถเพิ่ม rows เพิ่มเติมได้ */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiskHome;
