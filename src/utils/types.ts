export interface Contact{
    id: number;
    email?: string;
    phoneNumber?: string;
    linkedId?: number;
    linkPrecedence: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
};

export interface ContactLink{
    emails: string[];
    phoneNumbers: string[];
    ids: number[];
};

export interface ContactExist {
    emailExist: boolean;
    phoneNumberExist: boolean;
};

export interface ContactResponse {
    primaryContactId: number,
    emails: string[],
    phoneNumbers: string[],
    secondaryContactIds: number[],
};

export interface IdentifyResponse {
    contact: ContactResponse;
};