import React, { useEffect, useState } from "react";
import { getImages, downloadImage } from "../services/image.service";

interface Image {
    _id: string;
    filename: string;
    contentType: string;
    uploadDate: string;
}

const ImageList: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);

    const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const data = await getImages();
            setImages(data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            {images.map((image) => (
                <div key={image._id} className="p-4 border rounded shadow">
                    <img
                        src={`${API_BASE_URL}/images/download/${image.filename}`}
                        alt={image.filename}
                        className="w-full h-32 object-cover"
                    />
                    <p className="text-sm text-center mt-2">{image.filename}</p>
                    <button
                        onClick={() => downloadImage(image.filename)}
                        className="mt-2 block bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 w-full"
                    >
                        Download
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ImageList;