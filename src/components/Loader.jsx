import { StarIcon } from "@heroicons/react/24/outline";

function Loader() {
  return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 my-10 gap-5 mx-auto z-0 justify-items-center">
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
    <LoaderCard />
  </div>;
}

export default Loader;

function LoaderCard() {
  return <div>
    <div className="w-56">
      <div className="relative rounded-2xl overflow-hidden">
        <div>
          <div className="h-44 w-full bg-gray-300 animate-pulse"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 pt-2">
        <p className="bg-gray-300 animate-pulse h-3 w-24 rounded-sm mb-1"></p>
        <div>
          <p className="bg-gray-300 animate-pulse h-2 w-full rounded-sm mb-1"></p>
          <p className="bg-gray-300 animate-pulse h-2 w-full rounded-sm"></p>
        </div>
        <div className="flex justify-between px-1">
          <p className="h-2 w-10 rounded-sm bg-gray-300 animate-pulse"></p>
          <div className="flex items-center">
            <p className="h-2 w-5 rounded-sm bg-gray-300 animate-pulse"></p>
            <StarIcon className="w-4 fill-gray-300 stroke-gray-300 animate-pulse" />
            <StarIcon className="w-4 fill-gray-300 stroke-gray-300 animate-pulse" />
            <StarIcon className="w-4 fill-gray-300 stroke-gray-300 animate-pulse" />
            <StarIcon className="w-4 fill-gray-300 stroke-gray-300 animate-pulse" />
            <StarIcon className="w-4 fill-gray-300 stroke-gray-300 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>;
}
