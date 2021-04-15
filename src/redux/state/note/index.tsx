import { useSelector } from "react-redux";

export function useNote(sectionId: string) {
  return useSelector((state: { [Key: string]: any }) => ({
    noteList: state?.note?.[sectionId],
  }));
}

export function useLoading() {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.note?.loading,
  }));
}
