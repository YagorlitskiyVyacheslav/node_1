import fsPromises from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { TContacts } from '../types/contacts.js'
import { nanoid } from 'nanoid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const contactsPath = path.join(__dirname, '../db', 'contacts.json')

export async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath)

    const parsedData = JSON.parse(data.toString('utf-8')) as
      | TContacts
      | undefined
    return parsedData ?? null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getContactById(contactId: string) {
  const items = await listContacts()
  return items?.find((item) => item.id === contactId) ?? null
}

export async function removeContact(contactId: string) {
  try {
    const filteredItems = (await listContacts())?.filter(
      (item) => item.id !== contactId,
    )

    if (filteredItems)
      await fsPromises.writeFile(contactsPath, JSON.stringify(filteredItems))

    return await listContacts()
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function addContact(name: string, email: string, phone: string) {
  try {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    }

    const items = await listContacts()
    const newItems = (items ?? []).concat(newContact)

    await fsPromises.writeFile(contactsPath, JSON.stringify(newItems))

    return await listContacts()
  } catch (e) {
    console.log(e)
    return null
  }
}
