export interface ProfileData  {
    important: {
        employment: string | null
        post: string | null;
        skills: string[] | [];
    }
    personal: {
        name: string | null;
        birth_date: string | null;
        work_date: string | null;
        gender: string | null;
        post: string | null;
    }
    contacts: {
        address: string | null;
        email: string | null;
        phone: string | null;
        underground: string | null;
    }
}

export interface UpdateProfileData  {
    important?: {
    }
    personal?: {
        name: string;
        birth_date: string;
        gender: string;
    }
    contacts?: {
        address: string | null;
        phone: string | null;
        underground: string | null;
    }
}
