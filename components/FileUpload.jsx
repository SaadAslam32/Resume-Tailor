// components/FileUpload.jsx
'use client';
import { useState } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { FiFile, FiCheckCircle, FiAlertTriangle, FiX } from 'react-icons/fi';

export default function FileUpload({ onFileSelected }) {
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  const handleAddFile = (error, fileItem) => {
    if (error) {
      setError(error.body);
      onFileSelected(null);
      return;
    }
    
    // Get the actual File object
    const selectedFile = fileItem.file;
    
    // Additional validation
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File is too large. Max size is 5MB.');
      return;
    }
    
    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are accepted.');
      return;
    }

    setFile(selectedFile);
    onFileSelected(selectedFile);
    setError(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileSelected(null);
    setError(null);
  };

  return (
    <div className="file-upload-container">
      {file ? (
        <div className="border-2 border-dashed border-green-500 bg-green-50/50 dark:bg-green-900/20 rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center">
            <FiFile className="text-green-600 text-xl mr-3" />
            <div>
              <p className="font-medium text-[var(--text-primary)] truncate max-w-xs">{file.name}</p>
              <p className="text-sm text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button 
            onClick={handleRemoveFile}
            className="text-red-500 hover:text-red-700 transition"
          >
            <FiX className="text-xl" />
          </button>
        </div>
      ) : (
        <FilePond
          onaddfile={handleAddFile}
          onremovefile={handleRemoveFile}
          allowMultiple={false}
          maxFiles={1}
          maxFileSize="5MB"
          acceptedFileTypes={['application/pdf']}
          labelIdle='<div class="flex flex-col items-center justify-center p-8 text-[var(--text-secondary)]"><svg class="w-12 h-12 mb-3 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg><div class="font-medium">Drag & Drop your resume</div><div>or <span class="underline text-[var(--accent-primary)]">browse files</span></div></div>'
          stylePanelLayout="integrated"
          styleButtonRemoveItemPosition="left bottom"
          styleLoadIndicatorPosition="right bottom"
          styleProgressIndicatorPosition="right bottom"
          styleButtonProcessItemPosition="right bottom"
          stylePanelAspectRatio="0.5"
          className="filepond--panel-root bg-[var(--bg-primary)] border-2 border-dashed border-[var(--border-primary)] rounded-xl"
        />
      )}

      {error && (
        <div className="mt-4 text-red-600 flex items-center">
          <FiAlertTriangle className="mr-2" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}