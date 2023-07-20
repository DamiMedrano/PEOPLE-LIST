export interface Person {
  name: string;
  phone: string;
  image: string;
  email: string;
  location: string;
}

export interface PersonCardProps {
  person: Person;
  onEdit: (oldPerson: Person, newPerson: Person) => void;
}

export interface SearchBarProps {
  string: string;
  onChangeString: (value: string) => void;
  onChangeSortString: (value: string) => void;
  peopleList: Person[];
}