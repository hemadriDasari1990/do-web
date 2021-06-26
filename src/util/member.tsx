import { HeaderColumn } from "../components/Members/Table/types";

export const headerColumns: Array<HeaderColumn> = [
  {
    id: 1,
    title: "User",
    key: "name",
  },
  {
    id: 2,
    title: "Status",
    key: "status",
  },
  {
    id: 3,
    title: "Verified",
    key: "isVerified",
  },
  {
    id: 4,
    title: "Created",
    key: "createdAt",
  },
  {
    id: 5,
    title: "Updated",
    key: "updatedAt",
  },
];

export const getMembers = (teams: Array<{ [Key: string]: any }>) => {
  if (!teams?.length) {
    return [];
  }
  const members: Array<{ [Key: string]: any }> = [];
  teams.map((team: { [Key: string]: any }) => {
    team?.members?.map((member: { [Key: string]: any }) => {
      members.push(member?.member);
    });
  });
  return members.filter(
    (elem: { [Key: string]: any }, index: number, self) =>
      self.findIndex((t: { [Key: string]: any }) => {
        return t?.name === elem?.name;
      }) === index
  );
};

export const getTeams = (teams: Array<{ [Key: string]: any }>) => {
  if (!teams?.length) {
    return [];
  }
  return teams?.map((item: { [Key: string]: any }) => item.team);
};

export const getTeamMembers = (members: Array<{ [Key: string]: any }>) => {
  if (!members?.length) {
    return [];
  }
  return members.map((elem: { [Key: string]: any }) => elem?.member);
};

export const getMemberIds = (teams: Array<{ [Key: string]: any }>) => {
  if (!teams?.length) {
    return [];
  }
  const members: Array<{ [Key: string]: any }> = [];
  teams.map((team: { [Key: string]: any }) => {
    team?.members?.map((member: { [Key: string]: any }) => {
      members.push(member?.member?._id);
    });
  });
  return members.filter(
    (elem: { [Key: string]: any }, index: number, self) =>
      self.findIndex((t: { [Key: string]: any }) => {
        return t?.name === elem?.name;
      }) === index
  );
};
