import * as PropTypes from "prop-types";
import * as React from "react";
import FormState, { IFormState } from "./FormState";

const forms = {};

const getFormState = (name: string) => {
  if (!forms[name]) forms[name] = new FormState();
  return forms[name];
};

export const Context = React.createContext<IFormState>(new FormState());

interface IProviderProps {
  children: React.ReactElement;
  formName: string;
}

export const Provider: React.FC<IProviderProps> = ({ children, formName }) => (
  <Context.Provider value={getFormState(formName)}>{children}</Context.Provider>
);

Provider.propTypes = {
  children: PropTypes.element.isRequired,
  formName: PropTypes.string.isRequired
};

export const { Consumer } = Context;
