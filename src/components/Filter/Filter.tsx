import FilterStl from "./Filter.module.css";
interface Props {
  filter: string;
  onChangeFilter(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function Filter({ filter, onChangeFilter }: Props) {
  return (
    <div className={FilterStl.filterContainer}>
      <label className={FilterStl.label}>
        Find contact by name:
        <input type='text' value={filter} onChange={onChangeFilter} name='filter' className={FilterStl.input} />
      </label>
    </div>
  );
}
