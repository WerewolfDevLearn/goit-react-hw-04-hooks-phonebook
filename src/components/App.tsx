import React, { Component } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./ContactForm/ContactForm";
import ContactsList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import AppStl from "./App.module.css";

export interface IContact {
  id: string;
  name: string;
  number: string;
}

export interface IValues {
  person: string;
  number: string;
}
interface ISate {
  contacts: IContact[];
  filter: string;
}

export default class App extends Component<{}, ISate> {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  onInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  addContact = ({ person, number }: IValues) => {
    if (this.state.contacts.some(contact => contact.name.toLocaleLowerCase() === person.toLocaleLowerCase())) {
      alert(`${person} is already in Contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name: person,
      number,
    };
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, contact] };
    });
  };

  removeContact = (contactId: string) => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={AppStl.container}>
        <h2 className={AppStl.heading}>PhoneBook</h2>

        <ContactForm onAddContact={this.addContact} />

        <h2 className={AppStl.heading}>Contacts</h2>

        {contacts.length > 1 && <Filter filter={filter} onChangeFilter={this.onInputValue} />}

        {contacts.length > 0 && <ContactsList visibleContacts={visibleContacts} onRemoveItem={this.removeContact} />}
      </div>
    );
  }
}
