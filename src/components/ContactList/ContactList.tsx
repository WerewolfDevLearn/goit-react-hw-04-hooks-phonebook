import ContactListItem from "./ContactListItem/ContactListItem";
import ContactListStl from "./ContactListItem/ContactListItem.module.css";
import { IContact } from "../App";
interface Props {
  visibleContacts: IContact[];
  onRemoveItem(contactId: string): void;
}

export default function ContactsList({ visibleContacts, onRemoveItem }: Props) {
  return (
    <ul className={ContactListStl.contactList}>
      {visibleContacts.map(visibleContact => (
        <ContactListItem
          contact={visibleContact}
          onRemove={() => onRemoveItem(visibleContact.id)}
          key={visibleContact.id}
        />
      ))}
    </ul>
  );
}
