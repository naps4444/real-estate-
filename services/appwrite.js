// services/appwrite.js
import { Client, Account } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('66f30ec00039592b48f6');        // Your project ID

const account = new Account(client);

export { account };
