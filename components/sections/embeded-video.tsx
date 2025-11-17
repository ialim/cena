import { SVG } from "../../svg";
import dynamic from "next/dynamic";
import { useState } from "react";

export interface EmbeddedVideoProps {
  videoUrl?: string;
  posterImage?: string;
}

const { play } = SVG;
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const EmbededVideo = ({
  videoUrl = "https://www.youtube.com/embed/r9jwGansp1E",
  posterImage = "/images/cover-embed.png",
}: EmbeddedVideoProps) => {
  const [playing, setPlaying] = useState(false);
  const onClick = () => {
    setPlaying(true);
  };
  return (
    <div className="relative bg-white">
      <div className="mx-11 lg:mx-0 lg:px-72 relative top-64 lg:top-24 bg-transparent z-20">
        <div
          className="bg-no-repeat bg-cover bg-center text-white rounded-md"
          style={{
            backgroundImage: `url(${posterImage})`,
            height: "32rem",
          }}
        >
          <div className="bg-gradient-to-b from-transparent to-gray-900 w-full h-full flex items-center justify-center rounded-md">
            {playing ? (
              <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="100%"
                playing={playing}
              />
            ) : (
              <button
                className="bg-brand-primary rounded-full w-24 h-24 p-9"
                onClick={onClick}
              >
                {play}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="relative bg-brand-secondary h-96 lg:h-44"></div>
    </div>
  );
};

export default EmbededVideo;
