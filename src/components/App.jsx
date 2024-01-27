import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
    ],
    filter:'',
    name:'',
    number:''
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if(storedContacts) {
      this.setState({ contacts:JSON.parse(storedContacts) });
  }
}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }


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
  
    const { name, number, contacts } = this.state;
  
    const isNameDuplicate = contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());
  
    if (isNameDuplicate) {
      alert('Contact with this name already exists. Please use a different name.');
      return;
    }
  
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
  
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <div className={styles.form}>
        <ContactForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          name={this.state.name}
          number={this.state.number}
          className={styles.contactForm}
        />
      </div>
      <div className={styles.contacts}>
        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          onChange={this.handleChange}
        />
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    </div>
    );
  }
}

export default App;

