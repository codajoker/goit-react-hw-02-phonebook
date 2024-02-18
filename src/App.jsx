import { Component } from "react";
import { Section, Form, ListContact, Filter } from "./components";
import { nanoid } from "nanoid";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  addContact = (data) => {
    if (
      this.state.contacts.find((contact) => {
        return (
          contact.name.toLocaleLowerCase() === data.name.toLocaleLowerCase()
        );
      })
    ) {
      alert(`${data.name} is already in contacts`);
    } 
      return this.setState((prevState)=>({
        contacts: [
          { name: data.name, id: nanoid(), number: data.number },
          ...prevState,
        ],
      }));
    
  };
  addFilter = (e) => {
    this.setState({ filter: e.target.value });
  };
  findContact = () => {
    return this.state.contacts.filter((contact) => {
      return contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase());
    });
  };
  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={this.addContact} />
        </Section>
        <Section title="Contact">
          <Filter onChange={this.addFilter}></Filter>
          <ListContact
            deleteContact={this.deleteContact}
            contacts={this.findContact()}
          ></ListContact>
        </Section>
      </>
    );
  }
}
export default App;
