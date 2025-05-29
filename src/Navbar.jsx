// components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("เลือกหน้า");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (page) => {
    setSelectedPage(page);
    setOpen(false);
  };

  const ShieldIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  const FileIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  );

  const ChevronIcon = () => (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and System Name */}
        <Link to="/">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <div className="text-blue-600">
                <ShieldIcon />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ระบบส่งข้อมูลความเสี่ยง</h1>
              <p className="text-blue-100 text-sm">Risk Data Submission System</p>
            </div>
          </div>
        </Link>

        {/* Dropdown Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="group bg-white bg-opacity-10 backdrop-blur-sm text-black px-6 py-3 rounded-xl hover:bg-white hover:bg-opacity-20 transition-all duration-300 flex items-center space-x-2 border border-white border-opacity-20 hover:border-opacity-40"
          >
            <FileIcon />
            <span className="font-medium">{selectedPage}</span>
            <ChevronIcon />
          </button>

          {open && (
            <div
              className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-20 overflow-hidden"
              style={{ animation: 'slideDown 0.2s ease-out' }}
            >
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  เอกสาร
                </div>
                <Link className='flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 group'
                  to="/assessmentTable">
                  <div className="w-10 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <div className="text-blue-600"><FileIcon /></div>
                  </div>
                  <div>
                    <div className="font-medium">ปค.4</div>
                    <p className="text-xs text-gray-500">รายงานการประเมินองค์ประกอบของการควบคุมภายใน</p>
                  </div>
                </Link>
                <Link className='flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 group'
                  to="/internalControlForm">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <div className="text-green-600"><FileIcon /></div>
                  </div>
                  <div>
                    <div className="font-medium">ปค.5</div>
                    <p className="text-xs text-gray-500">รายงานการประเมินผลการควบคุมภายใน</p>
                  </div>
                </Link>
                <Link className='flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 group'
                  to="/controlEnvironmentForm">
                  <div className="w-10 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-yellow-200 transition-colors">
                    <div className="text-yellow-600"><FileIcon /></div>
                  </div>
                  <div>
                    <div className="font-medium">แบบประเมิน</div>
                    <p className="text-xs text-gray-500">รายงานการประเมินองค์ประกอบของการควบคุมภายใน</p>
                  </div>
                </Link>
                {/* <a
                  href="/pko4"
                  onClick={() => handleSelect("ป.ค4")}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <div className="text-blue-600"><FileIcon /></div>
                  </div>
                  <div>
                    <div className="font-medium">ป.ค4</div>
                    <div className="text-xs text-gray-500">รายงานการประเมินองค์ประกอบของการควบคุมภายใน</div>
                  </div>
                </a> */}
                {/* <a
                  href="/pko5"
                  onClick={() => handleSelect("ป.ค5")}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 group"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <div className="text-green-600"><FileIcon /></div>
                  </div>
                  <div>
                    <div className="font-medium">ป.ค5</div>
                    <div className="text-xs text-gray-500">รายงานการประเมินผลการควบคุมภายใน</div>
                  </div>
                </a> */}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
