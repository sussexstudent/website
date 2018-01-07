declare module "react-onclickout" {
  class ClickOut extends React.Component<{
    onClickOut(e: React.MouseEvent<HTMLElement>): void;
    children: any;
  }> {}

  export default ClickOut;
}
