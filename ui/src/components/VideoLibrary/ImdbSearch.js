import React, { useState } from "react";
import { Dialog, FormGroup, InputGroup } from "@blueprintjs/core";

const ImdbSearchInner = ({ searchTitle }) => {
  const [enteredTitle, setEnteredTitle] = useState(searchTitle);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  return (
    <React.Fragment>
      <FormGroup helperText="Video Title" inline={true}>
        <InputGroup
          id="imdbsearch-title-input"
          value={enteredTitle}
          onChange={titleChangeHandler}
        />
      </FormGroup>
    </React.Fragment>
  );
};

//wrapping the search in a dialog allows the dialog to collapse gracefully
// when showSearch becomes false while allowing the state of the internal component
// to be reset when unrendered
const ImdbSearch = (props) => {
  return (
    <Dialog isOpen={props.showSearch}>
      {props.showSearch && <ImdbSearchInner {...props} />}
    </Dialog>
  );
};

export default ImdbSearch;
