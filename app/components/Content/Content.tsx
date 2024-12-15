import React from "react";
import { TextDecrypt } from "../Text/TextDecrypt";
import Resume from "../../settings/resume.json";
import { FirstName, LastName } from "../../utils/getName";

const Content: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto">
      <div className="flex flex-col items-start lg:ml-[12.5rem] md:ml-[2.5rem]">
        <h2 className="text-xl md:text-2xl text-gray-800">
          <TextDecrypt text={`${FirstName} ${LastName}`} />
        </h2>
        <h1 className="text-5xl md:text-6xl font-bold mt-4 text-gray-900">
          <TextDecrypt text={`${Resume.basics.job1} + `} />
          <TextDecrypt text={`${Resume.basics.job2}`} />
        </h1>
      </div>
    </div>
  );
};

export default Content