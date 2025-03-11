import React, { useState } from "react";
import { uploadImage } from "../services/image.service";

const ImageUpload: React.FC<{ onUploadSuccess: () => void }> = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setLoading(true);
        try {
            await uploadImage(selectedFile);
            alert("Upload successful!");
            onUploadSuccess();
        } catch (error) {
            console.error("Upload error:", error);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <input type="file" onChange={handleFileChange} className="p-2 border rounded" />
            <button
                onClick={handleUpload}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {loading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
};

export default ImageUpload;