import { getJSON, deleteJSON } from '../lib/xhr'
import { contactsWereLoaded, contactWasDeleted, contactDeletionFailed } from '../actions/ServerActionCreators'

const API = 'http://addressbook-api.herokuapp.com'

export function loadContacts() {
  getJSON(`${API}/contacts`, function (error, res) {
    contactsWereLoaded(res.contacts)
  })
}

export function deleteContact(contact) {
  deleteJSON(`${API}/contacts/${contact.id}`, function (error, res) {
    if(error) return contactDeletionFailed(contact, error)

    contactWasDeleted(contact)
  })
}
