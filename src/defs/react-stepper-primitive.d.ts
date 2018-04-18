declare module 'react-stepper-primitive' {
  type RenderFunction = (
    props: {
      getFormProps: any;
      getInputProps: any;
      getIncrementProps: any;
      getDecrementProps: any;
    },
  ) => any;

  class Stepper extends React.Component<{
    min: number;
    max: number;
    render: RenderFunction;
    onChange?(value: number): void;
  }> {}

  export default Stepper;
}
