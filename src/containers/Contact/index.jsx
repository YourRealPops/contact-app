import React, { useState } from "react";
import "./styles.scss";
import Header from "../../components/Header";
// import AddContactButton from "../AddContactButton";
import { RiContactsBook3Fill } from "react-icons/ri";
import { Trash2, UserPlus, X } from "lucide-react";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newContact, setNewContact] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [checkedContacts, setCheckedContacts] = useState([]);

  const addContact = () => {
    if (newContact.fullName && newContact.email && newContact.phoneNumber) {
      setContacts([...contacts, { ...newContact, id: Date.now() }]);
      setNewContact({ fullName: "", email: "", phoneNumber: "" });
      setShowAddModal(false);
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    setCheckedContacts(checkedContacts.filter((contactId) => contactId !== id));
  };

  const toggleCheck = (id) => {
    setCheckedContacts((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((contactId) => contactId !== id)
        : [...prevChecked, id]
    );
  };

  const deleteCheckedContacts = () => {
    setContacts(
      contacts.filter((contact) => !checkedContacts.includes(contact.id))
    );
    setCheckedContacts([]);
  };

  return (
    <>
      <Header />
      <div className="contact">
        <div className="contact__info">
          <RiContactsBook3Fill color="#4355fa" size={100} />
          <div className="contact__info__description">
            <h1>CONTACTS</h1>
            <p>Welcome to Lorem Phonebook</p>
          </div>
        </div>
        <div className="contact__addContact">
          <input type="text" />
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
        <UserPlus size={16} /> ADD CONTACT
      </button>
      </div>

          {checkedContacts.length > 0 && (
            <button className="delete-all-btn" onClick={deleteCheckedContacts}>
              <Trash2 size={16} /> DELETE ALL
            </button>
          )}

          <table className="contacts-table">
            <thead>
              <tr>
                <th></th>
                <th>FULLNAME</th>
                <th>EMAIL ADDRESS</th>
                <th>PHONE NUMBER</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedContacts.includes(contact.id)}
                      onChange={() => toggleCheck(contact.id)}
                    />
                  </td>
                  <td>{`${contact.firstName} ${contact.lastName}`}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteContact(contact.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showAddModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>ADD CONTACT</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  <X size={24} />
                </button>
                <div className="input-group">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="Enter Your First Name"
                    value={newContact.firstName}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="input-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Enter Your Last Name"
                    value={newContact.lastName}
                    onChange={(e) =>
                      setNewContact({ ...newContact, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Input Your Email"
                    value={newContact.email}
                    onChange={(e) =>
                      setNewContact({ ...newContact, email: e.target.value })
                    }
                  />
                </div>
                <div className="input-group">
                  <label>Phone number</label>
                  <input
                    type="tel"
                    placeholder="Input Your Phone Numb"
                    value={newContact.phoneNumber}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="button-group">
                  <button
                    className="cancel-btn"
                    onClick={() => setShowAddModal(false)}
                  >
                    CANCEL
                  </button>
                  <button className="add-contact-btn" onClick={addContact}>
                    ADD CONTACT
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      
    </>
  );
};

export default Contact;
