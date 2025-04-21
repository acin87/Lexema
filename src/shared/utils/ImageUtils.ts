import { BASEURL } from '../../app/api/ApiConfig';

const checkImages = (profileImage: string | undefined = undefined) => {
    const defaultProfileImage = `${BASEURL}/media/users/images/profile-bg.jpg`;
    let mainImage = defaultProfileImage;

    if (profileImage) {
        mainImage = (profileImage.startsWith('http') ? profileImage : `${BASEURL}${profileImage}`) || defaultProfileImage;
    }

    return { mainImage };
};

export default checkImages;
