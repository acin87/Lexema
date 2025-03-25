import { useState, useEffect } from 'react';
import { BASEURL } from '../../app/api/ApiConfig';
import { checkUrl } from '../../shared/utils/Utils';
import { ProfileImages } from '../../entities/profile/types/ProfileTypes';


const useCheckImages = (images: ProfileImages[] | undefined) => {
    const [mainImage, setMainImage] = useState<string | undefined>(undefined);
    const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (images && images.length > 0) {
            const defaultProfileImage = `${BASEURL}/media/users/images/profile-bg.jpg`;
            const imagesTemp = images || [];

            let newProfileImage = defaultProfileImage;
            let newAvatarImage = undefined;  

            for (const image of imagesTemp) {
                if (image.avatar_image) {
                    newAvatarImage = checkUrl(image.avatar_image);
                }
                if (image.main_page_image) {
                    newProfileImage = checkUrl(image.main_page_image);
                    break;
                }
            }

            setMainImage(newProfileImage);
            if (newAvatarImage) {
                setAvatarImage(newAvatarImage);
            }
        }
    }, [images]);

    return { mainImage, avatarImage };
};

export default useCheckImages;




