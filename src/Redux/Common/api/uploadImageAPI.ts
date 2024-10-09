import axios from 'axios';

export const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'gm_toolbox_images');
    let response = await axios.post('https://api.cloudinary.com/v1_1/duxo9pztr/image/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
    return response.data.secure_url;
};