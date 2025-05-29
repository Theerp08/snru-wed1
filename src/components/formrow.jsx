import React from 'react';

const FormRow = ({ 
  question, 
  responses, 
  handleChange, 
  handleNoteChange, 
  showSectionInfo = false,
  sectionTitle = "",
  sectionSubtitle = "",
  showPrincipleInfo = false,
  principleTitle = "",
  principleDescription = "" 
}) => {
  const response = responses[question.id] || { result: '', note: '' };

  return (
    <tr>
      <td className="border px-3 py-2 align-top">
        {showSectionInfo && (
          <>
            {sectionTitle}<br />
            {sectionSubtitle}
          </>
        )}
      </td>
      <td className="border px-3 py-2 align-top">
        {showPrincipleInfo && (
          <>
            {principleTitle}<br />
            {principleDescription}
          </>
        )}
      </td>
      <td className="border px-3 py-2 align-top">
        {question.text}
      </td>
      <td className="border px-3 py-2 text-center">
        <input
          type="radio"
          name={question.id}
          value="มี"
          checked={response.result === 'มี'}
          onChange={() => handleChange(question.id, 'มี')}
        />
      </td>
      <td className="border px-3 py-2 text-center">
        <input
          type="radio"
          name={question.id}
          value="ไม่มี"
          checked={response.result === 'ไม่มี'}
          onChange={() => handleChange(question.id, 'ไม่มี')}
        />
      </td>
      <td className="border px-3 py-2">
        <input
          type="text"
          className="w-full px-2 py-1 outline-none bg-transparent"
          placeholder="ระบุเพิ่มเติม (ถ้ามี)"
          value={response.note}
          onChange={(e) => handleNoteChange(question.id, e.target.value)}
        />
      </td>
    </tr>
  );
};

export default FormRow;