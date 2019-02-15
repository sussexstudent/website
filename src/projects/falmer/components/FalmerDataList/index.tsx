import React, { useState, useCallback } from 'react';

interface IRowProps {
  id?: number;
  key?: number;
  selectable: boolean;
  isSelected: boolean;
  onChange(id: number, event: React.KeyboardEvent<HTMLInputElement>): void;
}

interface Item {
  id: number;
}

interface IProps {
  header(args: IRowProps): any;
  selectable: boolean;
  items: Item[];
  children(item: Item, props: IRowProps): any;
}

const FalmerDataList: React.FC<IProps> = ({
  header,
  selectable,
  items,
  children,
}) => {
  const [checked, setChecked] = useState<{ [id: number]: boolean }>({});

  const handleRowSelect = useCallback(
    (id: number, event: React.KeyboardEvent<HTMLInputElement>) => {
      setChecked((checked) => ({
        ...checked,
        [id]: event.currentTarget.checked,
      }));
    },
    [],
  );

  return (
    <div className="FalmerDataList">
      <table className="FalmerDataList__list">
        <thead>
          {header({
            selectable,
            isSelected: false,
            onChange: () => null,
          })}
        </thead>
        <tbody>
          {items.map((item) =>
            children(item, {
              selectable,
              key: item.id,
              isSelected: checked[item.id],
              onChange: handleRowSelect,
            }),
          )}
        </tbody>
      </table>
    </div>
  );
};

export const HeaderCell: React.FC<{}> = (props) => {
  return <th>{props.children}</th>;
};

export const Row: React.FC<IRowProps> = (props) => {
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
};

export const Cell: React.FC<{}> = (props) => {
  return <td>{props.children}</td>;
};

export default FalmerDataList;
