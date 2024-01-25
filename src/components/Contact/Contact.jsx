import React from 'react';

class Contact extends React.Component {
  render() {
    const { contact, onDeleteContact } = this.props;

    return (
      <li key={contact.id}>
        {contact.name} - {contact.number}
        <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
      </li>
    );
  }
}

export default Contact;
