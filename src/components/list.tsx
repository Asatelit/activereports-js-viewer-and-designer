export interface ListItemProp {
  name: string;
  value: string;
}

export interface ListProps {
  title: string;
  items: ListItemProp[];
  currentItem?: ListItemProp;
  selectionChanged: (data: ListItemProp) => void;
}

export const List = ({ items, currentItem, selectionChanged }: ListProps) => {
  return (
    <>
      <h5 className="list-title">Reports:</h5>
      <ul className="list">
        {items.map((item, index) => (
          <li
            key={`${item.name}_${index}`}
            className={`list-item ${
              item.name === currentItem?.name ? "active gc-accent-color" : ""
            }`}
            onClick={() => selectionChanged(item)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};
