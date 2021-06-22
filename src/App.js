import SearchBar from './Components/SearchBar';
import PersonCard from './Components/PersonCard';
import { getPeople } from './API/people';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { Col, Container, Row, Spinner } from 'react-bootstrap';

const App = () => {
    const [peopleList, setPeopleList] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [searchString, setSearchString] = useState('');
    const [filteredpeopleList, setFilteredpeopleList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Get data from API
    useEffect(() => {
        const setPeople = async (quantity) => {
            setIsLoading(true);
            const people = await getPeople(quantity);
            setPeopleList(people);
            setIsLoading(false);
        };
        // Set amount of people
        setPeople(200);
    }, []);

    // Filters
    useEffect(() => {
        const applyFilters = () => {
            let sortedAndFilteredList = peopleList.filter(
                (person) =>
                    person.name
                        .toLowerCase()
                        .normalize()
                        .includes(searchString.toLowerCase()) ||
                    person.email
                        .toLowerCase()
                        .normalize()
                        .includes(searchString.toLowerCase()) ||
                    person.location
                        .toLowerCase()
                        .normalize()
                        .includes(searchString.toLowerCase()) ||
                    person.phone.replace(/\D/g, '').includes(searchString)
            );

            if (sortBy) {
                sortedAndFilteredList = _.sortBy(
                    sortedAndFilteredList,
                    [(person) => person[sortBy].toLowerCase()],
                    ['asc']
                );
            }
            setFilteredpeopleList(sortedAndFilteredList);
        };

        applyFilters();
    }, [peopleList, sortBy, searchString]);

    // Update person's info
    const onEditPerson = (personToEdit, newPerson) => {
        const peopleListCopy = [...peopleList];
        const index = peopleListCopy.indexOf(personToEdit);
        peopleListCopy[index] = newPerson;
        setPeopleList(peopleListCopy);
    };

    return (
        <Container style={{ marginTop: '5rem', marginBottom: '5rem' }}>
            <SearchBar
                searchString={searchString}
                onChangeString={setSearchString}
                onChangeSortString={setSortBy}
            />
            {isLoading ? (
                <Container
                    style={{
                        justifyContent: 'center',
                        display: 'flex',
                        marginTop: '20%',
                        color: '#a3a3a3',
                    }}
                >
                    <Spinner animation='border' />
                </Container>
            ) : (
                <Row>
                    {filteredpeopleList.length > 0 ? (
                        filteredpeopleList.map((person) => (
                            <Col
                                key={person.email}
                                className='mb-4 col-12 col-sm-6 col-lg-3 pt-5'
                            >
                                <PersonCard
                                    key={person.email}
                                    person={person}
                                    onEdit={onEditPerson}
                                />
                            </Col>
                        ))
                    ) : (
                        <Container
                            style={{
                                justifyContent: 'center',
                                display: 'flex',
                                marginTop: '10%',
                                color: '#a3a3a3',
                            }}
                        >
                            <h4>No results</h4>
                        </Container>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default App;
