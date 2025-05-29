import React, { useState } from "react";

const AssessmentTable = () => {
  const [agency, setAgency] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatThaiDate = (dateStr) => {
    if (!dateStr) return "........................................";
    const date = new Date(dateStr);
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
  };

  const [assessmentItems, setAssessmentItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({});

  const modalTitles = {
    1: "1. สภาพแวดล้อมการควบคุม (5 หลักการ)",
    2: "2. การประเมินความเสี่ยง (4 หลักการ)",
    3: "3. กิจกรรมการควบคุม (3 หลักการ)",
    4: "4. สารสนเทศและการสื่อสาร (3 หลักการ)",
    5: "5. กิจกรรมการติดตามผล (2 หลักการ)",
  };

  const form2Fields = [
    ["mission_name", "1.1 หน่วยงานแสดงให้เห็นถึงการยึดมั่นในคุณค่าของความซื่อสัตย์และจริยธรรม"],
    ["risk", "1.2 ผู้กำกับดูแลของหน่วยงานแสดงให้เห็นถึงความเป็นอิสระจากฝ่ายบริหาร และมีหน้าที่กำกับดูแลให้การพัฒนาหรือปรับปรุงการควบคุมภายใน"],
    ["control", "1.3 หัวหน้าหน่วยงานได้ดำเนินการสร้างองค์กรสายบังคับบัญชาที่เหมาะสม รวมถึงมีการมอบหมายหน้าที่ความรับผิดชอบที่ชัดเจน"],
    ["evaluation", "1.4 หน่วยงานมีการดำเนินการสร้างแรงจูงใจให้บุคลากรปฏิบัติงานด้วยความสามารถและความซื่อสัตย์สุจริต"],
    ["remaining_risk", "1.5 หน่วยงานมีแนวทางที่ส่งเสริมให้บุคลากรปฏิบัติงานสอดคล้องกับค่านิยมของหน่วยงาน"],
  ];

  const form3Fields = [
    ["mission_name", "2.1หน่วยงานระบุวัตถุประสงค์การควบคุมภายในของการปฏิบัติงานให้สอดคล้องกับวัตถุประสงค์ขององค์กรไว้อย่างชัดเจนและเพียงพอที่จะสามารถระบุและประเมินความเสี่ยงที่เกี่ยวข้องกับวัตถุประสงค์"],
    ["risk", "2.2 หน่วยงานระบุความเสี่ยงที่มีผลต่อการบรรลุวัตถุประสงค์การควบคุมภายในครอบคลุมทั้งหมด และมีการระดมข้อคิดเห็นหรือพิจารณาวิธีการจัดการความเสี่ยงนั้น"],
    ["control", "2.3 หน่วยงานพิจารณาโอกาสที่จะทุจริตเพื่อประกอบการประเมินความเสี่ยงที่ส่งผลต่อการบรรลุวัตถุประสงค์ "],
    ["evaluation", "2.4 หน่วยงานระบุและประเมินการเปลี่ยนแปลงที่อาจมีผลกระทบอย่างมีนัยสำคัญต่อระบบการควบคุมภายใน"],
  ];

  const form4Fields = [
    ["mission_name", "3.1หน่วยงานระบุและพัฒนากิจกรรมการควบคุมเพื่อลดความเสี่ยงในการบรรลุวัตถุประสงค์ในอยู่ในระดับที่ยอมรับได้"],
    ["risk", "3.2 หน่วยงานระบุและพัฒนากิจกรรมการควบคุมทั่วไปด้านเทคโนโลยี เพื่อสนับสนุนการบรรลุวัตถุประสงค์"],
    ["control", "3.3 หน่วยงานบูรณาการกิจกรรมการควบคุม โดยกำหนดไว้ในนโยบาย ประกาศด้วย ผลลัพธ์กิจกรรมควรสื่อสารและมีการปฏิบัติเพื่อนำนโยบายไปสู่การปฏิบัติจริง"],
  ];

  const form5Fields = [
    ["mission_name", "4.1 หน่วยงานจัดทำหรือจัดหาและใช้สารสนเทศที่เกี่ยวข้องและมีคุณภาพ เพื่อสนับสนุนให้มีการปฏิบัติการควบคุมภายในที่กำหนด"],
    ["risk", "4.2 หน่วยงานจัดให้มีช่องทางสื่อสารภายในที่สามารถสื่อสารสารสนเทศ โดยเฉพาะอย่างยิ่งการตอบโต้ต่อกรณีที่มีผลกระทบต่อการควบคุมภายใน ไม่ว่าจะเป็นด้านพฤติการณ์หรือวิธีการปฏิบัติงานการควบคุมภายในที่ผิดพลาด"],
    ["control", "4.3 หน่วยงานมีการสื่อสารกับบุคลากรภายนอกเกี่ยวกับเรื่องที่มีผลกระทบต่อการปฏิบัติตามการควบคุมภายในที่กำหนด"],
  ];

  const form6Fields = [
    ["mission_name", "5.1 หน่วยงานระบุพัฒนาและดำเนินการประเมินผลระหว่างการปฏิบัติงานและ/หรือการประเมินผลเป็นระยะตามที่กำหนด เพื่อให้เกิดความมั่นใจได้ว่าการปฏิบัติตามองค์ประกอบของการควบคุมภายใน"],
    ["risk", "5.2 หน่วยงานประเมินและสื่อสารข้อบกพร่องหรือข้อควรพิจารณาของการควบคุมภายในอย่างทันท่วงทีต่อฝ่ายบริหารและผู้เกี่ยวข้อง เพื่อให้มีการปรับปรุงระบบการดำเนินการให้ได้อย่างเหมาะสม"],
  ];

  const formFieldsByModal = {
    1: form2Fields,
    2: form3Fields,
    3: form4Fields,
    4: form5Fields,
    5: form6Fields,
  };

  // เปิด modal และรีเซ็ต formData ตามหัวข้อ
  const openModal = (modalNumber) => {
    const fields = formFieldsByModal[modalNumber];
    const initialData = {};
    fields.forEach(([key]) => {
      initialData[key] = "";
    });
    setFormData(initialData);
    setActiveModal(modalNumber);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const handleSave = () => {
    const isAnyEmpty = Object.values(formData).some((v) => !v.trim());
    
    if (isAnyEmpty) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const fields = formFieldsByModal[activeModal];
    const newItems = fields.map(([key, label], idx) => ({
      id: assessmentItems.length + idx + 1,
      group: activeModal, // ✅ ระบุกลุ่มหัวข้อ
      controlComponent: label,
      evaluationResult: formData[key],
    }));

    setAssessmentItems((prev) => [...prev, ...newItems]);
    closeModal();
  };

  return (
    <div>
      <div className="absolute top-0 right-0 mt-23 mr-4 text-sm text-white font-semibold">
        <div className="border border-blue-700 bg-blue-700 rounded-md px-3 py-1 shadow-sm">
          ปค.4
        </div>
      </div>
      <div className="space-y-4 max-w-2xl mx-auto text-gray-800">
        {/* ส่วนหัวรายงาน */}
        <div className="mt-12 text-center leading-relaxed space-y-2 border-t border-gray-200 pt-8">
          <p className="text-lg text-gray-700">
            หน่วยงาน <span className="underline decoration-dotted decoration-gray-400">{agency || "........................................"}</span>
          </p>
          <p className="text-2xl font-bold text-gray-900">
            รายงานการประเมินองค์ประกอบของการควบคุมภายใน
          </p>
          <p className="text-lg text-gray-700">
            สำหรับระยะเวลาดำเนินงานที่สิ้นสุด ณ วันที่
            <span className="underline font-bold ml-2 inline-block min-w-[180px] text-gray-800">
              {formatThaiDate(endDate)}
            </span>
          </p>
        </div>
      </div>
      {/* ฟอร์มกรอกข้อมูล */}
      <div className="flex justify-center mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* หน่วยงาน */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              หน่วยงาน <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-[300px] border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 shadow-sm"
              placeholder="กรอกชื่อหน่วยงาน"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
            />
          </div>
          {/* วันที่สิ้นสุด */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              วันที่สิ้นสุด <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-[200px] border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 shadow-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="p-8 bg-gray-10 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          แบบประเมินองค์ประกอบการควบคุมภายใน
        </h1>

        {/* ปุ่มเปิด Modal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => openModal(num)}
              className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-5 rounded-lg shadow-md transition"
            >
              {modalTitles[num]}
            </button>
          ))}
        </div>

        {/* Modal */}
        {activeModal && (
          <div className="fixed inset-0 bg-opacity-60  backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">
                {modalTitles[activeModal]}
              </h2>

              {formFieldsByModal[activeModal].map(([key, label]) => (
                <div key={key} className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">{label}</label>
                  <textarea
                    rows={2}
                    value={formData[key] || ""}
                    onChange={(e) => handleFieldChange(key, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="กรอกผลการประเมิน"
                  />
                </div>
              ))}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        )}


        {/* ตารางแสดงผล */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 shadow-sm bg-white text-gray-800">
            <thead className="bg-gray-100 text-center">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-base font-semibold w-1/2">
                  องค์ประกอบของการควบคุมภายใน
                </th>
                <th className="border border-gray-300 px-4 py-3 text-base font-semibold w-1/2">
                  ผลการประเมิน / ข้อสรุป
                </th>
              </tr>
            </thead>
            <tbody>
              {assessmentItems.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center p-6 text-gray-500">
                    ยังไม่มีรายการประเมิน
                  </td>
                </tr>
              ) : (
                Object.entries(
                  assessmentItems.reduce((groups, item) => {
                    if (!groups[item.group]) groups[item.group] = [];
                    groups[item.group].push(item);
                    return groups;
                  }, {})
                ).map(([groupNum, items]) => (
                  <React.Fragment key={groupNum}>
                    <tr className="bg-blue-100 text-gray-900">
                      <td colSpan={2} className="p-3 font-bold">
                        {modalTitles[groupNum]}
                      </td>
                    </tr>
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 align-top">
                          {item.controlComponent}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 align-top">
                          {item.evaluationResult}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssessmentTable;
