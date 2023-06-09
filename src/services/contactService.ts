import db from '../config/database';
import { Contact } from '../utils/types';
import { mapRowToContact, getParamNumber } from '../utils/contactUtils';

class ContactService {

    public static async getContacts(emails: string[], phoneNumbers: string[], ids?: number[]): Promise<Contact[]> {
        let query = 'SELECT * FROM contact WHERE';
        const params = [];

        if(emails.length){
            query += ' email IN ' + getParamNumber(emails.length, params.length+1);
            params.push(...emails);
        }

        if(phoneNumbers.length){
            if(emails.length){
                query += ' OR'
            }
            query += ' phone_number IN ' + getParamNumber(phoneNumbers.length, params.length+1);
            params.push(...phoneNumbers);
        }

        if(ids?.length){
            if(phoneNumbers.length){
                query += ' OR'
            }
            query += ' id IN ' + getParamNumber(ids.length, params.length+1);
            params.push(...ids);
            query += ' OR linked_id IN ' + getParamNumber(ids.length, params.length+1);
            params.push(...ids);
        }

        query += ' ORDER BY created_at ASC';
        
        const { rows } = await db.query(query, params);
        return rows.map((row:any) => mapRowToContact(row));
    };

    public static async addContact(email?: string, phoneNumber?: string, linkPrecedence?: string, linkedId?: number|null): Promise<Contact> {
        const query = 'INSERT INTO contact (email, phone_number, link_precedence, linked_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const params = [email, phoneNumber, linkPrecedence, linkedId];
        const { rows } = await db.query(query, params);
        return  mapRowToContact(rows[0]);
    };

    public static async updateContacts(ids: number[], linkPrecedence: string, linkedId: number): Promise<Contact | null> {
        let query = 'UPDATE contact SET link_precedence = $1, linked_id = $2 WHERE id IN ' + getParamNumber(ids.length, 3); 
        query += ' RETURNING *';
        const params = [linkPrecedence, linkedId, ...ids];
        const { rows } = await db.query(query, params);

        if(rows.length === 0) {
            return null;
        }

        return mapRowToContact(rows[0]);
    };
};

export default ContactService;
