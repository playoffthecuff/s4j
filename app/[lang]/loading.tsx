import ClockSpinner from "@/components/spinner/clock";

export default function Loading() {
  return (
    <div className="relative w-screen h-svh flex justify-center items-center">
      <ClockSpinner className="" />
    </div>
  );
}
