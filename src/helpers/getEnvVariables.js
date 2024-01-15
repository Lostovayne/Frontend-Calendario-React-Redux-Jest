/* eslint-disable no-undef */
export const getEnvVariables = () => {
    const variablesEntorno = import.meta.env;
    return variablesEntorno;
};
