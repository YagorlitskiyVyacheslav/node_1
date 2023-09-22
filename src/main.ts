import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from './modules/contacts.js'
import { Command } from 'commander'

type TInvokeAction = {
  action: 'list' | 'get' | 'add' | 'remove'
  id?: string
  name?: string
  email?: string
  phone?: string
}

const program = new Command()

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

function invokeAction({ action, id, name, email, phone }: TInvokeAction) {
  switch (action) {
    case 'list':
      listContacts().then((data) => console.log(data))
      break
    case 'get':
      if (id) getContactById(id).then((data) => console.log(data))
      break
    case 'add':
      if (name && email && phone)
        addContact(name, email, phone).then((data) => console.log(data))
      break
    case 'remove':
      if (id) removeContact(id).then((data) => console.log(data))
      break
    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

console.log(argv)

invokeAction(argv as TInvokeAction)
