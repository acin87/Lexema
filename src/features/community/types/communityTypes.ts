export interface Community {
    id: number;
    name: string;
    description: string;
    cover_image?: string;
    avtar_image?: string;
    imageUrl?: string;
    images: [
        {
            uploaded_at: string;
            image_type: string;
            image: string;
        },
    ];
    members_count: number;
    is_member: boolean;
    createdAt: string;
}

export interface CommunitiesResponse {
    results: Community[];
    next: string | null;
    previous: string | null;
    count: number;
}

export interface CreateCommunityRequest {
    name: string;
    description: string;
    avatar_image?: File;
    cover_image?: File;
}

export interface CommunityFormValues {
    name: string;
    description: string;
    avatar?: File;
    cover?: File;
}
