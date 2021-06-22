export const getPeople = async (quantity) => {
    const response = await fetch(
        `https://randomuser.me/api/?results=${quantity}&&inc=name,location,email,phone,picture`
    );
    const jsonResponse = await response.json();
    return jsonResponse.results.map((apiUser) => formatPeople(apiUser));
};

const formatPeople = (apiUser) => {
    return {
        name: `${apiUser.name.first} ${apiUser.name.last}`,
        phone: apiUser.phone,
        image: apiUser.picture.large,
        email: apiUser.email,
        location: `${apiUser.location.city}, ${apiUser.location.state}`,
    };
};
