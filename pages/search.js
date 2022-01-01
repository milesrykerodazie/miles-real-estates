import { useState } from "react";
import { useRouter } from "next/router";

import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import { baseUrl, fetchApi } from "../utils/fetchApi";

import Properties from "../components/Properties";
import noresult from "../assets/images/noresult.png";
import Image from "next/image";

function Search({ properties }) {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <div className="mt-2 px-2">
      <div
        className="flex justify-center items-center p-2 space-x-2 text-xl bg-indigo-50 rounded-md"
        onClick={() => setSearchFilters(!searchFilters)}
      >
        <p className="text-gray-800 font-bold capitalize ">
          Search property by filters
        </p>
        <BsFilter className="cursor-pointer" />
      </div>
      {searchFilters && <SearchFilters />}
      <p className="mt-3 text-gray-500 text-2xl font-bold">
        Properties {router.query.purpose}
      </p>
      <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 justify-center">
        {properties.map((property) => (
          <Properties property={property} key={property.id} />
        ))}
      </div>
      {properties.length === 0 && (
        <div className="flex flex-col justify-center items-center mt-3">
          <Image
            src={noresult}
            width={400}
            height={200}
            alt=""
            className="object-contain"
          />
          <p className="text-gray-600 text-xl font-semibold mt-5">
            No Result found
          </p>
        </div>
      )}
    </div>
  );
}

export default Search;

//server side rendering of filterData
export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
