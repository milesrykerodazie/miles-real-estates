import Image from "next/image";
import Link from "next/link";
import DefaultImage from "../assets/images/house.jpg";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

function Properties({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) {
  return (
    <Link href={`/property/${externalID}`} passHref>
      <div className="">
        <Image
          src={coverPhoto ? coverPhoto.url : DefaultImage}
          width={400}
          height={260}
          className="rounded-md"
        />
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
        <p className="text-gray-500 uppercase">
          {title.length > 30 ? title.substring(0, 35) + "..." : title}
        </p>
      </div>
    </Link>
  );
}

export default Properties;
