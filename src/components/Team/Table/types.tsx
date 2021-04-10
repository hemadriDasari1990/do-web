export type Order = "asc" | "desc";

export type Data = {
  name: string;
  _id: string;
  createdAt: string;
  totalMembers: number;
  status: string;
  totalBoards: number;
  members: Array<{ [Key: string]: any }>;
  updatedAt: string;
};

export type HeaderColumn = {
  id: number;
  title: string;
  disablePadding?: boolean;
  key: keyof Data;
};

export type TableProps = {
  data: Array<Data>;
  headerColumns: Array<HeaderColumn>;
  refreshData: () => void;
  loading: boolean;
  viewItem: (item: { [Key: string]: any }) => void;
  handleMenu: (
    event: React.MouseEvent<HTMLButtonElement>,
    item: { [Key: string]: any }
  ) => void;
  handleAddMember: (item: { [Key: string]: any }) => void;
};

export type TableHeader = {
  headerColumns: Array<HeaderColumn>;
  order: Order;
  orderBy: string;
  refreshData: () => void;
  handleRequestSort: (property: keyof Data) => void;
};
