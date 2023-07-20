import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import SearchBar from "./Components/SearchBar/SearchBar";
import PersonCard from "./Components/PersonCard/PersonCard";
import { getPeople } from "./API/people";
import _ from "lodash";
import { Person } from "./types";

const App: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [sortBy, setSortBy] = useState<string>(""); // Updated type
  const [searchString, setSearchString] = useState<string>("");
  const [filteredPeopleList, setFilteredPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Get data from API
  useEffect(() => {
    const setPeople = async (quantity: number) => {
      setIsLoading(true);
      const people = await getPeople(quantity);
      setPeopleList(people);
      setIsLoading(false);
    };
    // Set amount of people
    setPeople(20);
  }, []);

  // Filters
  useEffect(() => {
    const applyFilters = () => {
      if (peopleList) {
        let sortedAndFilteredList: Person[] = peopleList.filter(
          (person: Person) =>
            person.name.toLowerCase().includes(searchString.toLowerCase()) ||
            person.email.toLowerCase().includes(searchString.toLowerCase()) ||
            person.location.toLowerCase().includes(searchString.toLowerCase()) ||
            person.phone.replace(/\D/g, "").includes(searchString)
        );

        if (sortBy) {
          sortedAndFilteredList = _.sortBy(
            sortedAndFilteredList,
            [(person: Person) => person[sortBy as keyof Person].toLowerCase()], // Added type assertion
            ["asc"]
          );
        }

        setFilteredPeopleList(sortedAndFilteredList);
      }
    };

    applyFilters();
  }, [peopleList, sortBy, searchString]);

  // Update person's info
  const onEditPerson = (personToEdit: Person, newPerson: Person) => {
    const peopleListCopy = [...peopleList];
    const index = peopleListCopy.indexOf(personToEdit);
    peopleListCopy[index] = newPerson;
    setPeopleList(peopleListCopy);
  };

  return (
    <Container style={{ marginTop: "5rem", marginBottom: "5rem" }}>
      {isLoading ? (
        <Container
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "20%",
            color: "#a3a3a3"
          }}
        >
          <Spinner animation="border" />
        </Container>
      ) : (
        <>
          {peopleList && (
            <SearchBar
              string={searchString}
              onChangeString={setSearchString}
              onChangeSortString={(value: string) => setSortBy(value)} // Updated function signature
              peopleList={peopleList}
            />
          )}
          <Row>
            {filteredPeopleList.length > 0 ? (
              filteredPeopleList.map((person: Person) => (
                <Col
                  key={person.email}
                  className="mb-4 col-12 col-sm-6 col-lg-3 pt-5"
                >
                  <PersonCard person={person} onEdit={onEditPerson} />
                </Col>
              ))
            ) : (
              <Container
                style={{
                  justifyContent: "center",
                  display: "flex",
                  marginTop: "10%",
                  color: "#a3a3a3"
                }}
              >
                <h4>No results</h4>
              </Container>
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default App;
