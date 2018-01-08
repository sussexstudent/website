import React from 'react';

interface IRowProps {
  id?: number;
  key?: number;
  selectable: boolean,
  isSelected: boolean,
  onChange(id: number, event: React.KeyboardEvent<HTMLInputElement>): void;
}

interface Item {
  id: number;
}

interface IProps {
  header(args: IRowProps): any;
  selectable: boolean;
  items: Array<Item>;
  children(item: Item, props: IRowProps): any;
}

interface IState {
  checked: {
    [id: number]: boolean
  }
}

class FalmerDataList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      checked: {},
    };
  }

  handleRowSelect(id: number, event: React.KeyboardEvent<HTMLInputElement>) {
    this.setState({
      checked: { ...this.state.checked, [id]: event.currentTarget.checked },
    });
  }

  render() {
    return (
      <div className="FalmerDataList">
        <table className="FalmerDataList__list">
          <thead>
            {this.props.header({
              selectable: this.props.selectable,
              isSelected: false,
              onChange: () => null,
            })}
          </thead>
          <tbody>
            {this.props.items.map(item =>
              this.props.children(item, {
                key: item.id,
                isSelected: this.state.checked[item.id] === true,
                selectable: this.props.selectable,
                onChange: this.handleRowSelect.bind(this),
              })
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export const HeaderCell: React.SFC<{}> = (props) => {
  return <th>{props.children}</th>;
}

export const Row: React.SFC<IRowProps> = (props) => {
  return (
    <tr className="FalmerDataList__row" key={props.id}>
      {props.selectable ? (
        <td>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={props.onChange.bind(null, props.id)}
          />
        </td>
      ) : null}
      {props.children}
    </tr>
  );
}

export const Cell: React.SFC<{}> = (props) => {
  return <td>{props.children}</td>;
}

export default FalmerDataList;
