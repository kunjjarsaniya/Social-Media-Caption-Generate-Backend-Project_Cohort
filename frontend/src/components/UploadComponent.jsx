import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

const UploadComponent = ({ onImageSelect }) => {
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            // Check file size (20MB limit)
            if (file.size > 20 * 1024 * 1024) {
                alert("File is too large. Please upload a file smaller than 20MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                onImageSelect(file, reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload an image or video file.");
        }
    };

    const clearImage = () => {
        setPreview(null);
        onImageSelect(null, null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div
            style={{
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
            }}
            onDragEnter={handleDrag}
        >
            <input
                ref={inputRef}
                type="file"
                id="input-file-upload"
                multiple={false}
                onChange={handleChange}
                accept="image/*,video/*"
                style={{ display: 'none' }}
            />

            {preview ? (
                <div style={{
                    position: 'relative',
                    borderRadius: 'var(--border-radius)',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    border: '1px solid var(--color-dark-gray)'
                }}>
                    {preview.startsWith('data:video') ? (
                        <video
                            src={preview}
                            controls
                            style={{ width: '100%', display: 'block' }}
                        />
                    ) : (
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ width: '100%', display: 'block' }}
                        />
                    )}
                    <button
                        onClick={clearImage}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>
            ) : (
                <label
                    htmlFor="input-file-upload"
                    className={dragActive ? "drag-active" : ""}
                    style={{
                        height: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px dashed ${dragActive ? 'var(--color-white)' : 'var(--color-gray)'}`,
                        borderRadius: 'var(--border-radius)',
                        backgroundColor: dragActive ? 'var(--color-dark-gray)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                    }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <Upload size={48} color="var(--color-gray)" style={{ marginBottom: '1rem' }} />
                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                        Drag & Drop your image or video here
                    </p>
                    <p style={{ color: 'var(--color-gray)', marginTop: '0.5rem' }}>
                        or click to browse
                    </p>
                </label>
            )}
        </div>
    );
};

export default UploadComponent;
