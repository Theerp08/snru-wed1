import React from 'react';
import FormRow from './FormRow';
import html2pdf from 'html2pdf.js';

// แปลงวันที่เป็นรูปแบบไทย
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

const FormTable = ({
  formSections,
  responses,
  handleChange,
  handleNoteChange,
  agency,
  setAgency,
  endDate,
  setEndDate,
}) => {
  const handleExportPDF = () => {
    const element = document.getElementById('report-content');
    const opt = {
      margin: 0.5,
      filename: 'internal-control-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  // รวมหมายเหตุทั้งหมด
  const allNotes = Object.entries(responses)
    .filter(([, value]) => value.note?.trim())
    .map(([questionId, value]) => ({
      id: questionId,
      note: value.note,
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
            รายงานการควบคุมภายใน
          </h2>
      {/* Input section */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow border">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">หน่วยงาน</label>
            <input
              type="text"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="ระบุชื่อหน่วยงาน"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">วันที่รายงาน</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
      </div>

      {/* Exportable content */}
      <div id="report-content">

        <div className="mb-6 text-center">

          {(agency || endDate) && (
            <div className="text-sm text-gray-600 space-y-1">
              {agency && <p>หน่วยงาน: {agency}</p>}
              {endDate && <p>วันที่รายงาน: {formatThaiDate(endDate)}</p>}
            </div>
          )}
          
        </div>
        

        {/* ตารางหลัก */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-800 border-r border-gray-200 w-1/4">📋 5 องค์ประกอบ</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-800 border-r border-gray-200 w-1/4">⚡ 17 หลักการ</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-800 border-r border-gray-200 w-1/2">❓ ประเด็นการประเมิน</th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-800 border-r border-gray-200">✓ มี</th>
                  <th className="px-4 py-4 text-center font-semibold text-gray-800 border-r border-gray-200">✗ ไม่มี</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-800">📝 หมายเหตุ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {formSections.map((section) =>
                  section.principles.map((principle) =>
                    principle.questions.map((question) => (
                      <FormRow
                        key={question.id}
                        question={question}
                        responses={responses}
                        handleChange={handleChange}
                        handleNoteChange={handleNoteChange}
                        showSectionInfo={principle.questions[0].id === question.id}
                        sectionTitle={section.title}
                        sectionSubtitle={section.subtitle}
                        showPrincipleInfo={principle.questions[0].id === question.id}
                        principleTitle={principle.title}
                        principleDescription={principle.description}
                      />
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* หมายเหตุรวม */}
          {allNotes.length > 0 && (
            <div className="px-6 py-6 border-t border-gray-200">
              <h3 className="text-md font-bold text-gray-800 mb-2">📝 สรุปหมายเหตุ</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {allNotes.map((note, index) => (
                  <li key={index}>{note.note}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">กรุณาตรวจสอบข้อมูลให้ครบถ้วนก่อนส่ง</p>
          </div>
        </div>
      </div>

      {/* ปุ่มบันทึก */}
      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={() => alert('บันทึกข้อมูลเรียบร้อยแล้ว')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow"
        >
          💾 บันทึก
        </button>
        <button
          onClick={handleExportPDF}
          disabled={!agency || !endDate}
          className={`${(!agency || !endDate)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
            } text-white font-semibold py-2 px-4 rounded-xl shadow`}
        >
          📄 บันทึกเป็น PDF
        </button>
      </div>
    </div>
  );
};

export default FormTable;
