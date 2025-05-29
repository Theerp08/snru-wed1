import React, { useRef, useState } from 'react';
import FormTable from './formtable';
import { formSections, createInitialResponses } from '../data/formData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ControlEnvironmentForm = () => {
  const [responses, setResponses] = useState(createInitialResponses());
  const formRef = useRef();

  const handleChange = (id, value) => {
    setResponses((prev) => ({
      ...prev,
      [id]: { ...prev[id], result: value }
    }));
  };

  const handleNoteChange = (id, note) => {
    setResponses((prev) => ({
      ...prev,
      [id]: { ...prev[id], note }
    }));
  };

  const handleDownloadPDF = () => {
    const input = formRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('internal-control-form.pdf');
    });
  };

  return (
    <div className='min-h-screen bg-blue-100 py-10'>
      <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow" ref={formRef}>
        <FormTable
          formSections={formSections}
          responses={responses}
          handleChange={handleChange}
          handleNoteChange={handleNoteChange}
        />
      </div>
    </div>
  );
};

export default ControlEnvironmentForm;
