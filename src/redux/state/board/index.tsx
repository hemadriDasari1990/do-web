import { useSelector } from "react-redux";

export function useBoard() {
  return useSelector((state: { [Key: string]: any }) => ({
    board: state.board.response,
    boards: state.board.boards,
    totalBoards: state.board.totalBoards,
    totalSections: state.board.response?.totalSections,
  }));
}

export function useBoardLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.board?.loading,
  }));
}

export function useBoardUpdateLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.board?.updateLoading,
  }));
}

export function useBoards() {
  return useSelector((state: { [Key: string]: any }) => ({
    boards: state.board?.boards,
  }));
}

export function useMenuItem() {
  return useSelector((state: { [Key: string]: any }) => ({
    itemName: state.board?.itemName,
  }));
}

export function useActivities() {
  return useSelector((state: { [Key: string]: any }) => ({
    activities: state.board?.activities,
    totalActivities: state.board?.totalActivities,
  }));
}

export function useActivitiesLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.board?.activitiesLoading,
  }));
}
