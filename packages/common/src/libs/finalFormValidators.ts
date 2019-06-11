type Validator = (value: any) => undefined | string;

export const required = (value: any) => (value ? undefined : 'Required');
export const maxLength = (maxLength: number) => (value: any) =>
  value.length > maxLength ? `Max length is ${maxLength}` : undefined;

export const composeValidators = (...validators: Validator[]) => (value: any) =>
  validators.reduce(
    (error: string | undefined, validator) => error || validator(value),
    undefined,
  );
