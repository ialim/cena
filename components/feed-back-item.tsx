import { SVG } from "../svg";

export interface FeedBackItemProps {
  fullname: string;
  profession: string;
  comment: string;
  imageUrl: string;
  rating: number;
}
const MAX_RATE = 5;
const { starFill, starOutline } = SVG;

const FeedBackItem = ({
  fullname,
  profession,
  comment,
  imageUrl,
  rating,
}: FeedBackItemProps) => {
  const rate: JSX.Element[] = [];
  for (let i = 0; i < MAX_RATE; i++) {
    if (rating - i > 0) {
      rate.push(starFill);
    } else {
      rate.push(starOutline);
    }
  }
  return (
    <div className="bg-white py-8 px-9 mt-20 lg:w-96 rounded-md">
      <div className="flex flex-row">
        {rate &&
          rate.map((svg, index) => (
            <span className="mr-1" key={index}>
              {svg}
            </span>
          ))}
      </div>
      <p className="text-sm font-normal font-BasierCircle text-brand-secondary my-5">
        {comment}
      </p>
      <div className="flex flex-row items-center justify-start">
        <img src={imageUrl} className="rounded-full" />
        <div className="ml-4">
          <h4 className=" text-brand-primary font-BasierCircle text-sm font-semibold">
            {fullname}
          </h4>
          <h6 className="text-brand-dark font-bold font-BasierCircle text-sm">
            {profession}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default FeedBackItem;
