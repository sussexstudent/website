import React from 'react';

class FalmerDataList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: {},
    };
  }

  handleRowSelect(id, event) {
    this.setState({
      checked: { ...this.state.checked, [id]: event.target.checked },
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

export function HeaderCell(props) {
  return <th>{props.children}</th>;
}

export function Row(props) {
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

export function Cell(props) {
  return <td>{props.children}</td>;
}

export default FalmerDataList;
