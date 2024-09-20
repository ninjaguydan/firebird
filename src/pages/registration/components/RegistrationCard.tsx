import { Dispatch, SetStateAction, useContext, useState } from "react";

import Loader from "src/components/loaders/Loader";
import ErrorModal from "src/components/modals/errorModal/ErrorModal";

import { sanitize } from "src/utils/helpers/formatters";
import useValidator from "src/utils/hooks/registration/useValidator";
import { ContactInfo } from "src/utils/interfaces/registration/IContactInfo";
import { VERIFICATION } from "src/utils/interfaces/registration/IRegistrationSteps";
import { EMPTY_USER } from "src/utils/interfaces/registration/IUser";
import {
  checkRequiredValues,
  registrationValidator,
} from "src/utils/validators/registrationValidator";
import { checkIfEmptyObject } from "src/utils/validators/validators";

import { StepContext } from "../Registration";
import RegistrationForm from "./RegistrationForm";

type RegistrationCardProps = {
  contact: ContactInfo;
  setContact: Dispatch<SetStateAction<ContactInfo>>;
  onRedirect: () => void;
};

export default function RegistrationCard({
  contact,
  setContact,
  onRedirect,
}: RegistrationCardProps) {
  const [loadingStep, setLoadingStep] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [formValues, setFormValues] = useState(EMPTY_USER);

  const setCurrentStep = useContext(StepContext)!;
  const errors = useValidator(formValues, EMPTY_USER, registrationValidator);

  const handleCloseModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.id === "phone") {
      setFormValues({ ...formValues, phone: sanitize(event.target.value) });
      return;
    }
    setFormValues({ ...formValues, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setLoadingStep(true);
    if (Object.keys(contact).length > 0) {
      var updatedContact = {
        phone: formValues.phone,
        email: formValues.email,
        username: formValues.username,
        name: `${formValues.fname} ${formValues.lname}`,
      };
      setContact((contact: any) => ({
        ...contact,
        ...updatedContact,
      }));
    }
    setTimeout(() => {
      setLoadingStep(false);
      setCurrentStep(VERIFICATION);
    }, 1000);
  };

  return (
    <section className="sign-up">
      {loadingStep && <Loader />}
      <ErrorModal
        showModal={showErrorModal}
        closeModal={handleCloseModal}
        errorMessage={errorMessage}
      />
      <RegistrationForm
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        formValues={formValues}
        errors={errors}
        disabled={checkIfEmptyObject(errors) && checkRequiredValues(formValues) ? false : true}
        onRedirect={onRedirect}
      />
    </section>
  );
}
