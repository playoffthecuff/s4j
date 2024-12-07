import { ShareMenuCircle } from "@/components/share-menu";

export default function Page() {
  return (
    <div className="w-80 h-80 flex justify-center align-middle mt-28 mb-14 min-h-[calc(100vh-236px)]">
      <ShareMenuCircle text="test text" title="title" />
    </div>
  );
}
