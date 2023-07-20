import React, { useState } from "react";
import { Card, Container, FormControl, Image } from "react-bootstrap";
import "./PersonCard.css";
import { PersonCardProps } from '../../types';

const PersonCard: React.FC<PersonCardProps> = ({ person, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [personEdit, setPersonEdit] = useState(person);

  const inputs = [
    {
      id: "email",
      value: personEdit.email,
      type: "text",
      onChange: (value: string) =>
        setPersonEdit({
          ...personEdit,
          email: value
        })
    },
    {
      id: "phone",
      value: personEdit.phone,
      type: "text",
      onChange: (value: string) =>
        setPersonEdit({
          ...personEdit,
          phone: value
        })
    },
    {
      id: "location",
      value: personEdit.location,
      type: "text",
      onChange: (value: string) =>
        setPersonEdit({
          ...personEdit,
          location: value
        })
    }
  ];

  const onCancelEdit = () => {
    setEditing(!editing);
    setPersonEdit(person);
  };

  const onConfirmEdit = () => {
    setEditing(false);
    onEdit(person, personEdit as typeof person);
  };

  return (
    <Card className="shadow">
      <Card.Header className="Header">
        <Card.Title>
          <i className="fas fa-user-edit" onClick={onCancelEdit}></i>
          <Container style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <FormControl
              className={
                "FormInput text-center text-white border-0 pl-5 " +
                (editing ? "border-bottom" : "")
              }
              style={{
                resize: "none",
                overflow: "hidden"
              }}
              type="text"
              value={personEdit.name}
              onChange={(e) =>
                setPersonEdit({
                  ...personEdit,
                  name: e.target.value
                })
              }
              disabled={!editing}
            />
          </Container>
        </Card.Title>
        <Container className="d-flex justify-content-center">
          <Image
            className="Image border-white position-absolute shadow border-4"
            src={personEdit.image}
            roundedCircle
          />
        </Container>
      </Card.Header>
      <Card.Body className="Body mb-3">
        {inputs.map((i) => (
          <Card.Text key={i.id}>
            <FormControl
              className={
                "FormInput text-center text-secondary border-0 " +
                (editing ? "border-bottom" : "")
              }
              type={i.type}
              value={i.value}
              onChange={(e) => i.onChange(e.target.value)}
              disabled={!editing}
            />
          </Card.Text>
        ))}
        {editing ? (
          <Container className="d-flex justify-content-around">
            <i className="fas fa-times" onClick={onCancelEdit}></i>
            <i className="fas fa-check" onClick={onConfirmEdit}></i>
          </Container>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default PersonCard;
