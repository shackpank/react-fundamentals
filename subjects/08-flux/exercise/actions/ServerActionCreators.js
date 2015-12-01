import { ActionTypes } from '../Constants'
import { dispatchServerAction } from '../AppDispatcher'

export function contactsWereLoaded(contacts) {
  dispatchServerAction({
    type: ActionTypes.CONTACTS_WERE_LOADED,
    contacts
  })
}

export function contactWasDeleted(contact) {
  dispatchServerAction({
    type: ActionTypes.CONTACT_WAS_DELETED,
    contact
  })
}

export function contactDeletionFailed(contact, error) {
  dispatchServerAction({
    type: ActionTypes.CONTACT_DELETION_FAILED,
    contact,
    error
  })
}
