import { Request, Response } from 'express';
import ContactService from '../services/contactService';
import {
    checkEmailAndPhoneExists,
    checkMultiplePrimary,
    transformToContactResponse,
    getContactLinks,
} from '../utils/contactUtils';
import { Contact, 
    ContactExist, 
    ContactLink 
} from '../utils/types';

class ContactController {
    public static async updateAndGetContact(req: Request, res: Response): Promise<void> {
        const { email, phoneNumber } = req.body;

        if (!email && !phoneNumber) {
            res.status(400).json({ error: 'Either email or phoneNumber must not null' });
        }

        try {
            const emails: string[] = [];
            const phoneNumbers: string[] = [];
            if(email){
                emails.push(email);
            }
            if(phoneNumber){
                phoneNumbers.push(phoneNumber);
            }

            //fetch all contacts which has given email or phoneNumber
            let contacts: Contact[] = await ContactService.getContacts(emails, phoneNumbers);

            if(contacts.length){
                //get all emails, phoneNumbers and ids
                const contactLinks:ContactLink = getContactLinks(contacts);

                // fetch all linked contacts
                contacts = await ContactService.getContacts(contactLinks.emails, contactLinks.phoneNumbers, contactLinks.ids);
            }
            
            //check given email or phoneNumber exist in table
            const contactExist: ContactExist = checkEmailAndPhoneExists(contacts, email, phoneNumber);

            // if given email or phoneNumber not exist in table then add into table
            if (!contactExist.emailExist || !contactExist.phoneNumberExist) {
                let linkPrecedence = 'primary';
                let linkedId = null;
                if (contacts.length) {
                    linkPrecedence = 'secondary';
                    linkedId = contacts[0].id;
                }
                const newContact: Contact = await ContactService.addContact(email, phoneNumber, linkPrecedence, linkedId);
                contacts.push(newContact);
            }

            // make all of them secondary except first primary one
            if(contacts.length > 1){
                const ids = contacts.map(contact => contact.id);
                await ContactService.updateContacts(ids.slice(1), 'secondary', ids[0]);
            }
            
            // tranform the reponse and return it
            res.json(transformToContactResponse(contacts));

        } catch (err) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };
};

export default ContactController;
