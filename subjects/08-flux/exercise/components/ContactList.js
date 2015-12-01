import React from 'react'
import { getState, addChangeListener, removeChangeListener } from '../stores/ContactStore'
import { loadContacts, deleteContact } from '../actions/ViewActionCreators'

const ContactList = React.createClass({
  getInitialState() {
    return getState()
  },

  contactsChanged() {
    this.setState(getState())
  },

  componentDidMount() {
    addChangeListener(this.contactsChanged)
    loadContacts()
  },

  componentWillUnmount() {
    removeChangeListener(this.contactsChanged)
  },

  deleteContact(contact) {
    deleteContact(contact)
  },

  render() {
    const { contacts, loaded } = this.state

    if (!loaded)
      return <div>Loading...</div>

    const items = contacts.map(contact => {
      return (
        <li key={contact.id}>
          <img src={contact.avatar} width="40" /> {contact.first} {contact.last}
          {contact.deletionFailureReason ?
            <span style={{ color: 'red', backgroundColor: 'black', border: '5px solid red', padding: '5px', marginLeft: '10px' }}>{contact.deletionFailureReason.toString()}</span>
          :
            contact.deleting ?
              <button disabled>deleting...</button>
            :
              <button onClick={this.deleteContact.bind(this, contact)}>delete</button>
          }
        </li>
      )
    })

    return (
      <div>
        <ul>{items}</ul>
      </div>
    )
  }
})

export default ContactList
