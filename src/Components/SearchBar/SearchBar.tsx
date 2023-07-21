import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  Navbar,
  Container,
  FormControl,
  InputGroup,
  ListGroup
} from "react-bootstrap";
import "./SearchBar.css";
import { Person, SearchBarProps } from "../../types";

const SearchBar: React.FC<SearchBarProps> = ({ string, onChangeString, onChangeSortString, peopleList }) => {

  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState<Person[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<keyof Person | "">(""); // Must ensure selectedSortOption matches the key of Person

  const peopleProps = [
    {
      label: "Name",
      orderKey: "name",
    },
    {
      label: "Email",
      orderKey: "email",
    },
    {
      label: "Location",
      orderKey: "location",
    },
  ];

const filterPeople = useCallback(
  (value: string): Promise<Person[]> => {
    return new Promise((resolve) => {
      const matchedOptions = peopleList.filter((person) => {
        const { name, email, location } = person;
        const filterCriteria = [name, email, location].join(" ").toLowerCase();
        return filterCriteria.includes(value);
      });

      if (selectedSortOption) {
        const sortByKey = selectedSortOption as keyof Person;
        const sortedAndFilteredList = sortPeopleByKey(matchedOptions, sortByKey);
        resolve(sortedAndFilteredList);
      } else {
        resolve(matchedOptions);
      }
    });
  },
  [peopleList, selectedSortOption]
);

const sortPeopleByKey = (people: Person[], key: keyof Person): Person[] => {
  return people.sort((a, b) => {
    const aValue = String(a[key]).toLowerCase();
    const bValue = String(b[key]).toLowerCase();

    return aValue.localeCompare(bValue, undefined, { sensitivity: "base" });
  });
};

  useEffect(() => {
    let isMounted = true;

    const handleAutocomplete = async (value: string) => {
      if (value.trim() === "") {
        setAutocompleteOptions([]);
        return;
      }

      const matchedOptions = await filterPeople(value.toLowerCase());
      if (isMounted) {
        setAutocompleteOptions(matchedOptions);
      }
    };

    handleAutocomplete(string);

    return () => {
      isMounted = false;
    };
  }, [string, filterPeople]);

  const handleSelectAutocomplete = (event: React.MouseEvent, option: Person) => {
    event.preventDefault();
    event.stopPropagation();
    onChangeString(option.name);
    setAutocompleteOptions([]);
    setShowAutocomplete(false);
  };

  const handleInputChange = (value: string) => {
    onChangeString(value);
  };

  const handleSortChange = (value: string) => {
    setSelectedSortOption(value as keyof Person); // Must use type assertion here to ensure it matches the key of Person
    onChangeSortString(value);
  };

  return (
    <Navbar>
      <Container>
        <InputGroup>
           <FormControl
            style={{ borderRadius: "7px", width: "54%" }}
            value={string}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setShowAutocomplete(true)}
            onBlur={() => setShowAutocomplete(false)}
            placeholder="Search..."
          />
          {showAutocomplete && autocompleteOptions.length > 0 && (
            <ListGroup className="Autocomplete">
              {autocompleteOptions.map((option) => (
                <ListGroup.Item
                  className="ListGroupItem"
                  key={option.email}
                  action
                  onClick={(e) => handleSelectAutocomplete(e, option)}
                >
                  {option.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
         )}
          <Form.Control
            as="select"
            className="form-control Sort bg-white"
            onChange={(e) => handleSortChange(e.target.value)}
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
