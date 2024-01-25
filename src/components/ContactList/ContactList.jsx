import Contact from 'components/Contact/Contact';
import React from 'react';


class ContactList extends React.Component {
  render() {
    const { contacts, onDeleteContact } = this.props;

    return (
      <ul>
        {contacts.map((contact) => (
         <Contact key={contact.id} contact={contact} onDeleteContact={onDeleteContact} />
        ))}
      </ul>
    );
  }
}

export default ContactList;
