import Image from "next/image";

function Banner({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  imageUrl,
}) {
  return (
    <div>
      <div className="">
        <div className="flex flex-wrap p-2 md:p-0 md:mt-10 justify-center">
          <Image
            src={imageUrl}
            width={500}
            height={300}
            className="rounded-md"
          />

          <div className="space-y-4 md:ml-6 flex-col mt-3 md:mt-0 w-96">
            <h4 className="text-gray-600 font-semibold">{purpose}</h4>
            <h2 className="text-3xl font-semibold text-gray-800 capitalize">
              {title1}
            </h2>
            <p className="text-gray-600 capitalize">{desc1}</p>
            <button className="text-gray-600 capitalize border px-2 py-1 rounded-lg bg-indigo-50">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
