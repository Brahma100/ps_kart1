import { useState, useEffect } from "react";
import {
  Container,
  Form,
  Field,
  Input,
  Button,
  Label,
  Message,
  ErrorMessage,
  Title,
  Pre
} from "./Login.style";

function Login() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  const handleClear = () => {
    setFormValues(initialValues);
    setFormErrors({});
    setIsSubmit(false);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <Container>
      

      <Form onSubmit={handleSubmit}>
        <Title>Login Form</Title>
        <div className="form">
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input

              required
              id="username"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </Field>
          <ErrorMessage>{formErrors.username}</ErrorMessage>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input

              required
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </Field>
          <ErrorMessage>{formErrors.email}</ErrorMessage>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </Field>
          <ErrorMessage>{formErrors.password}</ErrorMessage>
          <Button>Submit</Button>
          <Button ml_10 danger type="button" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
