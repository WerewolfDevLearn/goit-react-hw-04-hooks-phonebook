import { useState, useEffect } from "react";
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

const defaultContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];
export default function App() {
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useState<IContact[]>(() => {
    try {
      const data = JSON.parse(window.localStorage.getItem("contacts")!) ?? defaultContacts;
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  });
  useEffect(() => {
    console.log("exequting");
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const onInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter(value);
  };

  const addContact = ({ person, number }: IValues) => {
    if (contacts.some(contact => contact.name.toLocaleLowerCase() === person.toLocaleLowerCase())) {
      alert(`${person} is already in Contacts`);
      return;
    }
    setContacts(contacts => {
      const contact = {
        id: nanoid(),
        name: person,
        number,
      };

      return [...contacts, contact];
    });
  };

  const removeContact = (contactId: string) => {
    setContacts(contacts => contacts.filter(({ id }) => id !== contactId));
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact => contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={AppStl.container}>
      <h2 className={AppStl.heading}>PhoneBook</h2>

      <ContactForm onAddContact={addContact} />

      <h2 className={AppStl.heading}>Contacts</h2>

      {contacts.length > 1 && <Filter filter={filter} onChangeFilter={onInputValue} />}

      {contacts.length > 0 && <ContactsList visibleContacts={visibleContacts} onRemoveItem={removeContact} />}
    </div>
  );
}
