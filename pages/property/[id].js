import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { baseUrl, fetchApi } from "../../utils/fetchApi";

import ImageScroll from "../../components/ImageScroll";

function PropertyDetails({
  propertyDetails: {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) {
  return (
    <div className="mt-5 max-w-4xl mx-auto px-2 lg:px-0">
      <div className="">{photos && <ImageScroll data={photos} />}</div>
      <div className="flex items-center">
        <div>
          {isVerified && <GoVerified className="w-4 h-4 text-green-400" />}
        </div>
        <p className="flex-grow ml-2 text-gray-800 font-semibold">
          AED ${price}
          {rentFrequency && `/${rentFrequency}`}
        </p>
        <img src={agency.logo.url} className="w-14 h-14 object-contain " />
      </div>
      <div className="flex items-center text-blue-400">
        {rooms}
        <FaBed className="w-4 h-4 mx-5" /> | {baths}{" "}
        <FaBath className="w-4 h-4 mx-5" /> | {millify(area)} sqft{" "}
        <BsGridFill className="w-4 h-4 mx-5" />
      </div>
      <p className="text-gray-500 uppercase">{title}</p>
      <p className="text-gray-700 mt-5 text-justify">{description}</p>
      <div className="border-b-2 px-2 mt-3 border-gray-100" />
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-between">
          <p className="text-gray-700 font-semibold">Type</p>
          <p className="text-gray-700 font-bold uppercase">{type}</p>
        </div>
        <div className=" flex justify-between">
          <p className="text-gray-700 font-semibold">Purpose</p>
          <p className="text-gray-700 font-bold uppercase">{purpose}</p>
        </div>
        {furnishingStatus && (
          <div className="flex justify-between">
            <p className="text-gray-700 font-semibold">Funishing Status</p>
            <p className="text-gray-700 font-bold uppercase">
              {furnishingStatus}
            </p>
          </div>
        )}
      </div>
      <div className="mt-5 flex flex-col lg:flex-row ">
        {amenities.length && (
          <p className="text-gray-700 font-semibold mr-3 whitespace-nowrap">
            Facilities :
          </p>
        )}
        <div className="flex flex-wrap">
          {amenities?.map((item) =>
            item?.amenities?.map((amenity) => (
              <p
                key={amenity.id}
                className="font-bold text-blue-400 p-2 border bg-indigo-50 rounded-md m-1"
              >
                {amenity.text}{" "}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;

//server side rendering of the filterData
export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: {
      propertyDetails: data,
    },
  };
}
