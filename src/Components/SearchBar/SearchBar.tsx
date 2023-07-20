import React, { useState } from "react";
import {
  Form,
  Navbar,
  Container,
  FormControl,
  InputGroup,
  ListGroup
} from "react-bootstrap";
import "./SearchBar.css";
import { Person, SearchBarProps } from '../../types';

const SearchBar: React.FC<SearchBarProps> = ({
  string,
  onChangeString,
  onChangeSortString,
  peopleList
}) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState<Person[]>([]);

  const peopleProps = [
    {
      label: "Name",
      orderKey: "name"
    },
    {
      label: "Email",
      orderKey: "email"
    },
    {
      label: "Location",
      orderKey: "location"
    }
  ];

  const handleAutocomplete = (value: string) => {
    const matchedOptions = peopleList.filter((person) => {
      const { name, email, location } = person;
      const filterCriteria = [name, email, location].join(" ").toLowerCase();
      return filterCriteria.includes(value.toLowerCase());
    });
    setAutocompleteOptions(matchedOptions);
  };

  const handleSelectAutocomplete = (option: Person) => {
    onChangeString(option.name);
    setAutocompleteOptions([]);
  };

  const handleInputChange = (value: string) => {
    onChangeString(value);
    handleAutocomplete(value);
  };

  return (
    <Navbar>
      <Container>
        <InputGroup>
          <FormControl
            style={{ borderRadius: "7px" }}
            value={string}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search..."
          />
          {autocompleteOptions.length > 0 && (
            <ListGroup className="autocomplete-list">
              {autocompleteOptions.map((option) => (
                <ListGroup.Item
                  key={option.email}
                  action
                  onClick={() => handleSelectAutocomplete(option)}
                >
                  {option.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <Form.Control
            as="select"
            className="Sort bg-white"
            onChange={(e) => onChangeSortString(e.target.value)}
          >
            <option value="" disabled hidden>
              Sort by
            </option>
            {peopleProps.map((personProp) => (
              <option key={personProp.orderKey} value={personProp.orderKey}>
                {personProp.label}
              </option>
            ))}
          </Form.Control>
        </InputGroup>
      </Container>
    </Navbar>
  );
};

export default SearchBar;
