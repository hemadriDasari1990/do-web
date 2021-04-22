import { useSelector } from "react-redux";

export function useNote(sectionId: string) {
  return useSelector((state: { [Key: string]: any }) => ({
    noteList: state?.note?.[sectionId]?.data,
  }));
}

export function useLoading(sectionId: string) {
  return useSelector((state: { [Key: string]: any }) => ({
    loading: state.note?.[sectionId]?.loading,
  }));
}
