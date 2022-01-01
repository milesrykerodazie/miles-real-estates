import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import { ImSpinner9 } from "react-icons/im";
import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import noresult from "../assets/images/noresult.svg";
import Image from "next/image";

function SearchFilters() {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    router.push({ pathname: path, query: query });
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };
      fetchData();
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-col lg:flex-row bg-indigo-50 rounded-lg mt-3">
      <div className=" ">
        <div className="flex-grow flex items-center flex-wrap">
          {filters?.map((filter) => (
            <div key={filter.queryName}>
              <select
                onChange={(e) =>
                  searchProperties({ [filter.queryName]: e.target.value })
                }
                name={filter.placeholder}
                className="object-contain px-3 py-1 m-2 outline-none transition ease-in delay-100 hover:scale-90  duration-500 rounded-lg"
              >
                <option value="" disabled selected hidden className="">
                  {filter.placeholder}
                </option>
                {filter?.items?.map((item) => (
                  <option value={item.value} key={item.value} className="">
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* something here */}
      <div className="mt-2 w-60 mr-10">
        <button
          className="bg-white px-2 py-1 rounded-md text-gray-900 w-60  mb-2 lg:mb-0 mx-2"
          onClick={() => setShowLocations(!showLocations)}
        >
          Search Location
        </button>
        {showLocations && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center w-60">
              <input
                type="text"
                value={searchTerm}
                placeholder="Enter Location"
                className="mt-1 px-2 py-1 bg-transparent border-2 border-blue-100 rounded-md outline-none m-2 w-60"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm !== "" && (
                <MdCancel
                  className="-ml-8 z-10 cursor-pointer"
                  onClick={() => {
                    setSearchTerm("");
                    setShowLocations(false);
                  }}
                />
              )}
            </div>
            {loading && (
              <ImSpinner9 className="w-4 h-4 text-gray-400 animate-spin mb-2" />
            )}
            {showLocations && (
              <div className="h-[300px] overflow-auto mb-2 scrollbar-hide ml-2">
                {locationData?.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <p className="cursor-pointer bg-gray-100 mb-1 p-2 border border-gray-200 rounded-md">
                      {location.name}
                    </p>
                  </div>
                ))}
                {!loading && !locationData?.length && (
                  <div className="mt-1 flex flex-col items-center justify-center">
                    <Image
                      src={noresult}
                      width={200}
                      height={100}
                      className="motion-safe:animate-pulse"
                    />
                    <p className="capitalize text-gray-600 font-semibold tracking-wider mt-2">
                      Waiting to search
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchFilters;
