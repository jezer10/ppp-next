import { LoadingComponent } from "@/components/LoadingComponent";
import { XMarkIcon } from "@heroicons/react/24/solid";
export default function Supervisors() {
  return (
    <>
      <div className="bg-black/60 ">
        <div className="relative rounded bg-white shadow">
          <button className="hover-bg-gray-200 absolute h-12 w-12 rounded-full bg-gray-600 p-2 top-2 right-2">
            <XMarkIcon />
          </button>
        </div>
      </div>
    </>
  );
}
