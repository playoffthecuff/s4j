// import { SpinnerIcon } from "@/components/icons";
import ClockSpinner from "@/components/spinner/clock";

export default function Loading() {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <ClockSpinner className="" />
    </div>
  );
}
