import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';


class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
    ],
    filter: '',
    name: '',
    number: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDeleteContact = (id) => {
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id)
    });
  };
  

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, contacts } = this.state;

    const isNameDuplicate = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (isNameDuplicate) {
      alert('Contact with this name already exists. Please use a different name.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number
    };

    this.setState({
      contacts: [...this.state.contacts, newContact],
      name: '',
      number: ''
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          name={this.state.name}
          number={this.state.number}
        />

        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          onChange={this.handleChange}
        />
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}

export default App;

