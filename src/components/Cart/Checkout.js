import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [FormValidity, setFormValidity] = useState({
    name: true,
    city: true,
    postalCode: true,
    street: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredstreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const isEmpty = (value) => value === "";
    const isFive = (value) => value.length === 5;

    const isValidName = !isEmpty(enteredName);
    const isValidStreet = !isEmpty(enteredstreet);
    const isValidCity = !isEmpty(enteredCity);
    const isValidPostalCode = isFive(enteredPostalCode);

    const formIsValid =
      isValidName && isValidCity && isValidStreet && isValidPostalCode;

    setFormValidity({
      name: isValidName,
      city: isValidCity,
      postalCode: isValidPostalCode,
      street: isValidStreet,
    });

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredstreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };
  // Style Classes
  const nameClasses = `${classes.control} ${
    !FormValidity.name ? classes.invalid : ""
  }`;
  const streetClasses = `${classes.control} ${
    !FormValidity.street ? classes.invalid : ""
  }`;
  const cityClasses = `${classes.control} ${
    !FormValidity.city ? classes.invalid : ""
  }`;
  const postalCodeClasses = `${classes.control} ${
    !FormValidity.postalCode ? classes.invalid : ""
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!FormValidity.name && <p>Please enter valid name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!FormValidity.street && <p>Please enter valid street.</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!FormValidity.postalCode && (
          <p>Please enter a valid Postal Code (5 characters) </p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!FormValidity.city && <p>Please enter valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
