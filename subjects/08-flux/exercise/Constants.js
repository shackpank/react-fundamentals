import keyMirror from 'key-mirror'

export default {

  ActionTypes: keyMirror({
    LOAD_CONTACTS: null,
    CONTACTS_WERE_LOADED: null,
    CONTACT_WAS_DELETED: null,
    DELETE_CONTACT: null,
    CONTACT_DELETION_FAILED: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

}
