import { BASEURL } from '../../app/api/ApiConfig';
import { Images } from '../../features/friends/types/FriendTypes';

const checkImages = (images: Images | undefined) => {
    const defaultProfileImage = `${BASEURL}/media/users/images/profile-bg.jpg`;
    let mainImage = defaultProfileImage;
    let avatarImage = undefined;
    if (images) {
        if (images.avatar_image) {
            avatarImage = images.avatar_image;
        }
        if (images.main_page_image) {
            mainImage = images.main_page_image;
        }
    }
    return { mainImage, avatarImage };
};

export default checkImages;