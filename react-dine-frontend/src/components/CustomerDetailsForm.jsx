import { useForm } from "react-hook-form";
import { PropTypes } from "prop-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer } from "../validation/customerSchema";
import useFormPersist from "react-hook-form-persist";

import Button from "./Button";
import FormErrorText from "./FormErrorText";

const CustomerFormDetails = ({ onSubmit, submitButtonElement }) => {
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Customer) });

  // Persist form data to localStorage
  useFormPersist("customerData", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input
        className="rounded-md border-2 border-react-blue bg-ocean-dark p-2"
        placeholder="John Doe"
        {...register("name")}
      />
      <FormErrorText>{errors.name?.message}</FormErrorText>

      <label htmlFor="email">Email*</label>
      <input
        className="rounded-md border-2 border-react-blue bg-ocean-dark p-2"
        placeholder="john@example.com"
        {...register("email")}
      />
      <FormErrorText>{errors.email?.message}</FormErrorText>

      <label htmlFor="street">Street</label>
      <input
        className="rounded-md border-2 border-react-blue bg-ocean-dark p-2"
        placeholder="123 Main St"
        {...register("street")}
      />
      <FormErrorText>{errors.street?.message}</FormErrorText>

      <label htmlFor="postalCode">Postal Code</label>
      <input
        className="rounded-md border-2 border-react-blue bg-ocean-dark p-2"
        placeholder="12345"
        {...register("postalCode")}
      />
      <FormErrorText>{errors.postalCode?.message}</FormErrorText>

      <label htmlFor="city">City</label>
      <input
        className="rounded-md border-2 border-react-blue bg-ocean-dark p-2"
        placeholder="New York"
        {...register("city")}
      />
      <FormErrorText>{errors.city?.message}</FormErrorText>
      {submitButtonElement ?? <Button type="submit">Submit</Button>}
    </form>
  );
};

CustomerFormDetails.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonElement: PropTypes.element,
};

export default CustomerFormDetails;
