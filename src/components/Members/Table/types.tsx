export type Order = "asc" | "desc";

export type Data = {
  name: string;
  email: string;
  _id: string;
  createdAt: string;
  status: string;
  totalTeams: number;
  isVerified: boolean;
  isAuthor: boolean;
  updatedAt: string;
  teams: Array<{ [Key: string]: any }>;
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
};

export type TableHeader = {
  headerColumns: Array<HeaderColumn>;
  order: Order;
  orderBy: string;
  refreshData: () => void;
  handleRequestSort: (property: keyof Data) => void;
};
