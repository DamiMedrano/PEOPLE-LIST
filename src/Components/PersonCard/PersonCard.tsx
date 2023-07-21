import React, { useState } from "react";
import { Card, Container, Image } from "react-bootstrap";
import "./PersonCard.css";
import { PersonCardProps } from '../../types';

const PersonCard: React.FC<PersonCardProps> = ({ person, searchString, onEdit }) => {
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

  const highlightText = (text: string, searchString: string) => {
    if (!searchString) return text;

    const regex = new RegExp(`(${escapeRegex(searchString)})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const escapeRegex = (string: string) => {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
  };

  return (
    <Card className="shadow">
      <Card.Header className="Header">
        <Card.Title>
          <i className="fas fa-user-edit" onClick={onCancelEdit}></i>
          <Container style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            {editing ? (
              <span
                className={
                  "FormInput text-center text-white border-0 pl-5 " +
                  (editing ? "border-bottom" : "")
                }
                style={{
                  resize: "none",
                  overflow: "hidden",
                  display: "inline-block", // Ensure the span respects the text content size
                }}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  setPersonEdit({
                    ...personEdit,
                    name: e.currentTarget.textContent || "",
                  })
                }
                dangerouslySetInnerHTML={{ __html: highlightText(personEdit.name, searchString) }}
              />
            ) : (
              <span
                style={{ display: "inline-block" }} // Ensure the span respects the text content size
                dangerouslySetInnerHTML={{ __html: highlightText(personEdit.name, searchString) }}
              />
            )}
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
            {editing ? (
              <span
                className="FormInput text-center text-secondary border-0 pl-5"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => i.onChange(e.currentTarget.textContent || "")}
                dangerouslySetInnerHTML={{ __html: highlightText(i.value, searchString) }}
              />
            ) : (
              <span
                dangerouslySetInnerHTML={{ __html: highlightText(i.value, searchString) }}
              />
            )}
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