import { useSelector } from "react-redux";

export function useBoard() {
  return useSelector((state: { [Key: string]: any }) => ({
    board: state.board.response,
    totalSections: state.board.response?.totalSections,
    totalBoards: state.board?.totalBoards,
  }));
}

export function useBoardLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.board?.loading,
  }));
}

export function useBoards() {
  return useSelector((state: { [Key: string]: any }) => ({
    boards: state.board?.boards,
  }));
}
