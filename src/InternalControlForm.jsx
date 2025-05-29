import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";

registerLocale("th", th);

// แปลงวันที่เป็นภาษาไทย
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

const InternalControlForm = () => {
    // ✅ ประกาศ State ให้ครบ
    const [agency, setAgency] = useState("");
    const [endDate, setEndDate] = useState("");

    const [form1Data, setForm1Data] = useState({
        unit: "",
        report_date: "",
        philosophy: "",
        vision: "",
        mission1: "",
        mission2: "",
        mission3: "",
        mission4: "",
        mission5: "",
    });

    const [form2Data, setForm2Data] = useState({
        mission_name: "",
        risk: "",
        control: "",
        evaluation: "",
        remaining_risk: "",
        improvement: "",
        responsible_unit: "",
    });

    const [tableRows, setTableRows] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // เพิ่ม state แสดงผลสรุปข้อมูล และล็อคฟอร์ม
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("form1Data"));
        if (savedData) setForm1Data(savedData);
    }, []);

    useEffect(() => {
        localStorage.setItem("form1Data", JSON.stringify(form1Data));
    }, [form1Data]);

    const handleForm1Change = (e) => {
        const { name, value } = e.target;
        setForm1Data((prev) => ({ ...prev, [name]: value }));
    };

    const handleForm2Change = (e) => {
        const { name, value } = e.target;
        setForm2Data((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddRow = () => {
        setTableRows((prevRows) => [...prevRows, form2Data]);
        setForm2Data({
            mission_name: "",
            risk: "",
            control: "",
            evaluation: "",
            remaining_risk: "",
            improvement: "",
            responsible_unit: "",
        });
    };

    const handleDeleteRow = (index) => {
        const updatedRows = tableRows.filter((_, i) => i !== index);
        setTableRows(updatedRows);
    };

    const handleSave = () => {
        alert("บันทึกข้อมูลเรียบร้อยแล้ว");
        setShowSummary(true);
    };

    const missionFields = [1, 2, 3, 4, 5];
    const textFields = ["philosophy", "vision"];
    const form2Fields = [
        ["mission_name", "พันธกิจที่"],
        ["risk", "ความเสี่ยง"],
        ["control", "การควบคุมภายในที่มีอยู่"],
        ["evaluation", "การประเมินผลการควบคุมภายใน"],
        ["remaining_risk", "ความเสี่ยงที่ยังมีอยู่"],
        ["improvement", "การปรับปรุงการควบคุมภายใน"],
        ["responsible_unit", "หน่วยงานที่รับผิดชอบ"],
    ];

    return (
        <div className="bg-blue-100 min-h-screen py-10 font-sans">
            <div className="max-w-7xl mx-auto bg-white p-1 shadow-xl rounded-2xl space-y-12">
                {/* ส่วนหัวรายงาน */}
                <div className="space-y-4 max-w-10xl mx-auto text-gray-800 relative">
                    <div className="text-right mt-2 mr-4">
                        <div className="inline-block border border-blue-700 bg-blue-700 text-white rounded-md px-3 py-1 shadow-sm">
                            ปค.5
                        </div>
                    </div>
                    <div className="mt-12 text-center leading-relaxed space-y-2  border-gray-200 pt-8">
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
                                disabled={showSummary} // ปิดแก้ไขเมื่อบันทึกแล้ว
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-800 mb-2">
                                วันที่สิ้นสุด <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                className="w-[200px] border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 shadow-sm"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                disabled={showSummary} // ปิดแก้ไขเมื่อบันทึกแล้ว
                            />
                        </div>
                    </div>
                </div>

                {textFields.map((field) => (
                    <div key={field} className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                        <label className="block font-semibold mb-2">
                            {field === "philosophy" ? "ปรัชญา" : "วิสัยทัศน์"}
                        </label>
                        <textarea
                            name={field}
                            value={form1Data[field]}
                            onChange={handleForm1Change}
                            className="w-full h-24 border border-black rounded p-3 text-lg resize-y"
                            disabled={showSummary} // ปิดแก้ไขเมื่อบันทึกแล้ว
                        />
                    </div>
                ))}

                <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
                    <label className="block font-semibold mb-4">พันธกิจ</label>
                    {missionFields.map((i) => (
                        <div key={i}>
                            {i}.{" "}
                            <input
                                type="text"
                                name={`mission${i}`}
                                value={form1Data[`mission${i}`]}
                                onChange={handleForm1Change}
                                className="w-full border border-black rounded px-3 py-2 text-lg mb-2"
                                disabled={showSummary} // ปิดแก้ไขเมื่อบันทึกแล้ว
                            />
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={handleSave}
                        disabled={showSummary} // ปิดใช้งานเมื่อบันทึกแล้ว
                        className={`bg-green-600 text-white px-6 py-2 rounded-xl text-lg hover:bg-green-700 transition ${showSummary ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        บันทึกข้อมูลทั้งหมด
                    </button>
                </div>

                {/* แสดงข้อมูลที่กรอกไว้หลังบันทึก */}
                {showSummary && (
                    <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 space-y-4 text-gray-800 mt-8">
                        <h3 className="text-xl font-bold text-yellow-700 mb-4">ข้อมูลที่กรอกไว้</h3>

                        <p><strong>หน่วยงาน:</strong> {agency || "-"}</p>
                        <p><strong>วันที่สิ้นสุด:</strong> {formatThaiDate(endDate)}</p>

                        <p><strong>ปรัชญา:</strong> {form1Data.philosophy || "-"}</p>
                        <p><strong>วิสัยทัศน์:</strong> {form1Data.vision || "-"}</p>

                        <div>
                            <strong>พันธกิจ:</strong>
                            <ul className="list-disc pl-6">
                                {missionFields.map((i) => {
                                    const mission = form1Data[`mission${i}`];
                                    return mission ? (
                                        <li key={i}>{i}. {mission}</li>
                                    ) : null;
                                })}
                            </ul>
                        </div>

                        <div>
                            <strong>รายการควบคุมภายใน:</strong>
                            {tableRows.length === 0 ? (
                                <p className="text-gray-500">ยังไม่มีรายการ</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-300 mt-2 text-sm">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                {form2Fields.map(([_, label]) => (
                                                    <th key={label} className="border border-gray-300 px-4 py-2">{label}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableRows.map((row, index) => (
                                                <tr key={index} className="even:bg-white odd:bg-gray-50">
                                                    {form2Fields.map(([name]) => (
                                                        <td key={name} className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                                                            {row[name] || "-"}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Modal ใส่รายการควบคุมภายใน */}
                {/* Modal เพิ่มรายการ */}
                {showModal && (
                    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-2xl w-full space-y-4 shadow-xl">
                            <h2 className="text-xl font-bold mb-4">เพิ่มรายการควบคุมภายใน</h2>
                            {form2Fields.map(([name, label]) => (
                                <div key={name}>
                                    <label className="block font-semibold mb-1">{label}:</label>
                                    <input
                                        type="text"
                                        name={name}
                                        value={form2Data[name]}
                                        onChange={handleForm2Change}
                                        className="w-full border border-gray-400 rounded px-3 py-2"
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end space-x-4 mt-6">
                                <button
                                    onClick={() => {
                                        handleAddRow();
                                        setShowModal(false);
                                    }}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    บันทึก
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                >
                                    ยกเลิก
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ตารางแสดงรายการควบคุมภายใน */}
                <div className="overflow-x-auto mt-6 max-w-7xl mx-auto">
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                {form2Fields.map(([_, label]) => (
                                    <th key={label} className="border border-gray-300 px-4 py-2">{label}</th>
                                ))}
                                <th className="border border-gray-300 px-4 py-2 w-16">ลบ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.length === 0 ? (
                                <tr>
                                    <td colSpan={form2Fields.length + 1} className="text-center p-4 text-gray-400">
                                        ยังไม่มีรายการ
                                    </td>
                                </tr>
                            ) : (
                                tableRows.map((row, index) => (
                                    <tr key={index} className="even:bg-white odd:bg-gray-50">
                                        {form2Fields.map(([name]) => (
                                            <td key={name} className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                                                {row[name]}
                                            </td>
                                        ))}
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {!showSummary ? (
                                                <button
                                                    onClick={() => handleDeleteRow(index)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    ลบ
                                                </button>
                                            ) : (
                                                <button disabled className="text-gray-400 cursor-not-allowed">
                                                    ลบ
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* ปุ่มเพิ่มรายการ ควบคุมภายใน - ซ่อนเมื่อบันทึกแล้ว */}
                {!showSummary && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 text-white px-6 py-2 rounded-xl text-lg hover:bg-blue-700 transition"
                        >
                            เพิ่มรายการควบคุมภายใน
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default InternalControlForm;
