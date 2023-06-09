import { ContactExist, ContactResponse, IdentifyResponse } from './types';
import { Contact, ContactLink } from './types';

export const mapRowToContact = (row:any): Contact => {
    return {
        id: row.id, 
        linkPrecedence: row.link_precedence, 
        createdAt: row.created_at, 
        updatedAt: row.updated_at, 
        email: row.email, 
        phoneNumber: row.phone_number, 
        linkedId: row.linked_id, 
        deletedAt: row.deleted_at,
    };
};

export const getContactLinks = (contacts: Contact[]): ContactLink => {
    const contactLinks: ContactLink = {
        emails: [],
        phoneNumbers: [],
        ids: []
    };

    for(const contact of contacts){
        if(contact.email){
            contactLinks.emails.push(contact.email);
        }
        if(contact.phoneNumber){
            contactLinks.phoneNumbers.push(contact.phoneNumber);
        }
        if(contact.linkedId){
            contactLinks.ids.push(contact.linkedId);
        }
        contactLinks.ids.push(contact.id);
    }

    return contactLinks;
};

export const checkEmailAndPhoneExists = (contacts: Contact[], email?: string, phoneNumber?: string): ContactExist => {
    let emailExist = !email ? true : false;
    let phoneNumberExist = !phoneNumber ? true : false;

    for(const contact of contacts){
        if(!emailExist && contact.email === email){
            emailExist = true;
        }

        if(!phoneNumberExist && contact.phoneNumber === phoneNumber){
            phoneNumberExist = true;
        }
    }

    return {
        emailExist,
        phoneNumberExist
    };

};

export const checkMultiplePrimary = (contacts: Contact[]): Contact|null => {
    for(let i = 1; i < contacts.length; ++i){
        if(contacts[i].linkPrecedence === 'primary'){
            return contacts[i];
        }
    }
    return null;
};

export const transformToContactResponse = (contacts: Contact[]): IdentifyResponse => {
    const contactResponse: ContactResponse = {
        primaryContactId: contacts[0].id,
        emails: [],
        phoneNumbers: [],
        secondaryContactIds: []
    };
    for(const [index, contact] of contacts.entries()){
        if(index === 0){
            contactResponse.primaryContactId = contact.id;
        }
        else{
            contactResponse.secondaryContactIds.push(contact.id);
        }

        if(contact.email && !contactResponse.emails.includes(contact.email)){
            contactResponse.emails.push(contact.email);
        }

        if(contact.phoneNumber && !contactResponse.phoneNumbers.includes(contact.phoneNumber)){
            contactResponse.phoneNumbers.push(contact.phoneNumber);
        }
    }
    return {
        contact: contactResponse
    };
};

export const getParamNumber = (len: number, start: number): string => {
    let res = '(';
    for(let i = start; i < len+start; ++i){
        res += '$' + i.toString();
        if(i != len+start-1){
            res += ',';
        }
    }
    res += ')';
    return res;
}