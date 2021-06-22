import {
    Form,
    Navbar,
    Container,
    FormControl,
    InputGroup,
} from 'react-bootstrap';
import '../Styles/SearchBar.css';

const SearchBar = ({ string, onChangeString, onChangeSortString }) => {
    const peopleProps = [
        {
            label: 'Name',
            orderKey: 'name',
        },
        {
            label: 'Email',
            orderKey: 'email',
        },
        {
            label: 'Location',
            orderKey: 'location',
        },
    ];

    return (
        <Navbar>
            <Container>
                <InputGroup>
                    <FormControl
                        style={{ borderRadius: '7px' }}
                        value={string}
                        onChange={(e) => onChangeString(e.target.value)}
                        placeholder='Search...'
                    />

                    <Form.Control
                        custom
                        as='select'
                        className='Sort bg-white'
                        onChange={(e) => onChangeSortString(e.target.value)}
                    >
                        <option value='' disabled selected hidden>
                            Sort by
                        </option>
                        {peopleProps.map((personProp) => (
                            <option
                                key={personProp.orderKey}
                                value={personProp.orderKey}
                            >
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
