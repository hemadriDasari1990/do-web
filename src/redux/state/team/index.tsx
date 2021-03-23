import { useSelector } from "react-redux";

export function useTeam() {
  return useSelector((state: { [Key: string]: any }) => ({
    team: state.team.response,
    members: state.team.response?.members,
    totalMembers: state.team.response?.totalMembers,
    teams: state.team.teams,
    totalTeams: state.team.totalTeams,
    inviteBoardResponse: state.team.response?.board,
    inviteSent: state.team.response?.inviteSent,
  }));
}

export function useTeamLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.team?.loading,
  }));
}
