import { Person } from '../types';

export const getPeople = async (quantity: number): Promise<Person[]> => {
    const response = await fetch(
        `https://randomuser.me/api/?results=${quantity}&&inc=name,location,email,phone,picture`
    );
    const jsonResponse = await response.json();
    return jsonResponse.results.map((apiPerson: any) => formatPeople(apiPerson));
};

const formatPeople = (apiPerson: any): Person => {
    return {
        name: `${apiPerson.name.first} ${apiPerson.name.last}`,
        phone: apiPerson.phone,
        image: apiPerson.picture.large,
        email: apiPerson.email,
        location: `${apiPerson.location.city}, ${apiPerson.location.state}`,
    };
};
