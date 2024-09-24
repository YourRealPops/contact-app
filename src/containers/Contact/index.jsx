import React, { useState, useEffect } from "react";
import "./styles.scss";
import Header from "../../components/Header";
// import AddContactButton from "../AddContactButton";
import { RiContactsBook3Fill } from "react-icons/ri";
import { Trash2, UserPlus, X, Search } from "lucide-react";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const [checkedContacts, setCheckedContacts] = useState([]);

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    console.log("addContact function called", newContact);
    if (
      newContact.firstName &&
      newContact.lastName &&
      newContact.email &&
      newContact.phoneNumber
    ) {
      const updatedContacts = [...contacts, { ...newContact, id: Date.now() }];
      console.log("Updated contacts:", updatedContacts);
      setContacts(updatedContacts);
      setNewContact({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });
      setShowAddModal(false);
    }
  };

  const deleteContact = (e, id) => {
    e.stopPropagation();
    setContacts(contacts.filter((contact) => contact.id !== id));
    setCheckedContacts(checkedContacts.filter((contactId) => contactId !== id));
  };

  const toggleCheck = (e, id) => {
    e.stopPropagation();
    setCheckedContacts((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((contactId) => contactId !== id)
        : [...prevChecked, id]
    );
  };

  const toggleAllChecks = () => {
    if (checkedContacts.length === contacts.length) {
      setCheckedContacts([]);
    } else {
      setCheckedContacts(contacts.map((contact) => contact.id));
    }
  };

  const deleteCheckedContacts = () => {
    setContacts(
      contacts.filter((contact) => !checkedContacts.includes(contact.id))
    );
    setCheckedContacts([]);
  };

  const openViewModal = (contact) => {
    setSelectedContact(contact);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setSelectedContact(null);
    setShowViewModal(false);
  };

  const openEditModal = () => {
    setEditingContact({ ...selectedContact });
    setShowEditModal(true);
    setShowViewModal(false);
  };

  const closeEditModal = () => {
    setEditingContact(null);
    setShowEditModal(false);
    setShowViewModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingContact((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditedContact = () => {
    setContacts(
      contacts.map((contact) =>
        contact.id === editingContact.id ? editingContact : contact
      )
    );
    setSelectedContact(null);
    setEditingContact(null);
    setShowEditModal(false);
    setShowViewModal(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.filter(String).map((part, i) => {
          return regex.test(part) ? (
            <mark key={i}>{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          );
        })}
      </span>
    );
  };

  const sortedAndFilteredContacts = contacts
    .filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      return fullName.includes(searchLower) ||
             contact.email.toLowerCase().includes(searchLower) ||
             contact.phoneNumber.includes(searchTerm);
    })
    .sort((a, b) => {
      const aFullName = `${a.firstName} ${a.lastName}`.toLowerCase();
      const bFullName = `${b.firstName} ${b.lastName}`.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      const aIncludes = aFullName.includes(searchLower);
      const bIncludes = bFullName.includes(searchLower);
      return bIncludes - aIncludes;
    });

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
        <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            className={`add-btn ${checkedContacts.length > 0 ? "blurred" : ""}`}
            onClick={() => setShowAddModal(true)}
            disabled={checkedContacts.length > 0}
          >
            <UserPlus size={16} /> ADD CONTACT
          </button>
          {checkedContacts.length > 0 && (
            <button className="delete-all-btn" onClick={deleteCheckedContacts}>
              <Trash2 size={16} /> DELETE ALL
            </button>
          )}
        </div>

        <table className="contacts-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    checkedContacts.length === contacts.length &&
                    contacts.length > 0
                  }
                  onChange={toggleAllChecks}
                />
              </th>
              <th>FULLNAME</th>
              <th>EMAIL ADDRESS</th>
              <th>PHONE NUMBER</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredContacts.map((contact) => (
              <tr key={contact.id} onClick={() => openViewModal(contact)}>
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={checkedContacts.includes(contact.id)}
                    onChange={(e) => toggleCheck(e, contact.id)}
                  />
                </td>
                <td>{highlightText(`${contact.firstName} ${contact.lastName}`, searchTerm)}</td>
                <td>{highlightText(contact.email, searchTerm)}</td>
                <td>{highlightText(contact.phoneNumber, searchTerm)}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button
                    className={`delete-btn ${
                      checkedContacts.includes(contact.id)
                        ? "active"
                        : "inactive"
                    }`}
                    onClick={(e) =>
                      checkedContacts.includes(contact.id) &&
                      deleteContact(e, contact.id)
                    }
                    disabled={!checkedContacts.includes(contact.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Add Contact Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal__header">
                <h2>ADD CONTACT</h2>
                <button
                  className="close-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <form
                className="modal__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  addContact();
                }}
              >
                <div>
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter Your First Name"
                    required
                    value={newContact.firstName}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Enter Your Last Name"
                    required
                    value={newContact.lastName}
                    onChange={(e) =>
                      setNewContact({ ...newContact, lastName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Input Your Email"
                    required
                    value={newContact.email}
                    onChange={(e) =>
                      setNewContact({ ...newContact, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Input Your Phone Number"
                    required
                    value={newContact.phoneNumber}
                    onChange={(e) =>
                      setNewContact({
                        ...newContact,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="modal__actions">
                  <button
                    type="button"
                    className="modal__button modal__button--cancel"
                    onClick={() => setShowAddModal(false)}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="modal__button modal__button--submit"
                  >
                    ADD CONTACT
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Contact Modal */}
        {showViewModal && selectedContact && (
          <div className="modal-overlay">
            <div className="view-modal">
              <div className="view-modal__content">
                <div className="view-modal__field">
                  <label>FULL NAME:</label>
                  <span>{`${selectedContact.firstName} ${selectedContact.lastName}`}</span>
                </div>
                <div className="view-modal__field">
                  <label>PhoneNumber:</label>
                  <span>{selectedContact.phoneNumber}</span>
                </div>
                <div className="view-modal__field">
                  <label>EMAIL:</label>
                  <span>{selectedContact.email}</span>
                </div>
                <div className="view-modal__actions">
                  <button
                    className="view-modal__button view-modal__button--primary"
                    onClick={openEditModal}
                  >
                    EDIT CONTACT
                  </button>
                  <button
                    className="view-modal__button view-modal__button--secondary"
                    onClick={closeViewModal}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Contact Modal */}
        {showEditModal && editingContact && (
          <div className="modal-overlay">
            <div className="edit-modal">
              <h2>Edit CONTACT</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveEditedContact();
                }}
              >
                <div className="edit-modal__field">
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editingContact.firstName}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="edit-modal__field">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editingContact.lastName}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="edit-modal__field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editingContact.email}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="edit-modal__field">
                  <label htmlFor="phoneNumber">Phone number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={editingContact.phoneNumber}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="edit-modal__actions">
                  <button
                    type="button"
                    className="edit-modal__button edit-modal__button--secondary"
                    onClick={closeEditModal}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="edit-modal__button edit-modal__button--primary"
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Contact;
