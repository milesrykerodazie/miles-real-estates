import Banner from "../components/Banner";
import { GiHouseKeys } from "react-icons/gi";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import Properties from "../components/Properties";

export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <div className="">
      <div>
        <Banner
          purpose="RENT A HOME"
          title1="Rental Homes for Everyone"
          desc1=" Explore from Apartments, builder floors, villas and more"
          buttonText="Explore Renting"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        />
        <h1 className="mt-5 flex items-center mb-4 px-2">
          <GiHouseKeys className="text-2xl text-blue-400" />
          <span className="text-gray-700 font-semibold capitalize text-2xl">
            Rental Homes
          </span>
        </h1>
        <div className="px-2 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 justify-center">
          {propertiesForRent.map((property) => (
            <Properties key={property.id} property={property} />
          ))}
        </div>
      </div>

      <div>
        <Banner
          purpose="BUY A HOME"
          title1="Find, Buy & Own Your Dream Home"
          desc1=" Explore from Apartments, land, builder floors villas and more"
          buttonText="Explore Buying"
          imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        />
        <h1 className="mt-5 flex items-center mb-4 px-2">
          <GiHouseKeys className="text-2xl text-blue-400" />
          <span className="text-gray-700 font-semibold capitalize text-2xl">
            Homes for sale
          </span>
        </h1>
        <div className="px-2 grid grid-col2-1 lg:grid-cols-3 md:grid-cols-2 gap-3 justify-center">
          {propertiesForSale.map((property) => (
            <Properties key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

//static rendering
export async function getStaticProps() {
  const propertyForSale = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=9`
  );
  const propertyForRent = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=9`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}
