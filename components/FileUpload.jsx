'use client';

import { useState } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { FiFile, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

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
      <FilePond
        onaddfile={handleAddFile}
        onremovefile={handleRemoveFile}
        allowMultiple={false}
        maxFiles={1}
        maxFileSize="5MB"
        acceptedFileTypes={['application/pdf']}
        labelIdle='Drag & Drop your resume or <span class="filepond--label-action">Browse</span>'
        labelFileTypeNotAllowed="Invalid file type. Only PDF is allowed."
        labelMaxFileSizeExceeded="File is too large. Max size is 5MB."
        labelMaxFileSize="Maximum file size is {filesize}"
        server={null} // No server upload needed
        name="file"
      />

      {error && (
        <div className="mt-4 text-red-600 flex items-center">
          <FiAlertTriangle className="mr-2" />
          <span>{error}</span>
        </div>
      )}

      {file && !error && (
        <div className="mt-4 flex items-center text-green-600">
          <FiCheckCircle className="mr-2" />
          <span>{file.name} (Ready to process)</span>
        </div>
      )}
    </div>
  );
}