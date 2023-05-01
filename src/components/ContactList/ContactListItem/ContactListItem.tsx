import React from "react";
import ContactListItemStl from "./ContactListItem.module.css";

interface IProps {
  contact: { name: string; number: string };
  onRemove: (e: React.SyntheticEvent) => void;
}

export default function ContactListItem({ contact, onRemove }: IProps): JSX.Element {
  const { name, number } = contact;
  return (
    <>
      <li className={ContactListItemStl.container}>
        <div className={ContactListItemStl.contactInfo}>
          {name} : {number}
        </div>
        <section className={ContactListItemStl.action}>
          <button type='button' onClick={onRemove}>
            Delete
          </button>
        </section>
      </li>
    </>
  );
}
