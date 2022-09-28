import { Device } from "@prisma/client";
import { useEffect } from "react";

interface DeviceCardProps {
  device: Device;
}

export default function DeviceCard({ device }: DeviceCardProps) {
  useEffect(() => {
    fetch("/api/sencing/${device.id}")
      .then((res) => res.json())
      .then((json) => console.log(json));
    console.log(device.id);
  }, []);

  return (
    // <div id="센서목록" className="flex flex-wrap justify-center">
    //   {deviceReadData.map((device, idx) => (
    //     <div
    //       key={idx}
    //       data-comment="장비카드"
    //       className="bg-[#60A6FE] dark:bg-[#363345] border-2 w-52 h-52 p-4
    //         flex flex-col justify-between rounded-2xl
    //         m-5"
    //     >
    //       <div className=" flex justify-end">
    //         <span className="text-5xl">30</span>
    //         <span className="text-2xl text-gray-500">{device.unit}</span>
    //       </div>
    //       <div className=" flex flex-col">
    //         <span className="text-gray-500">
    //           {device.location} ({device.memo})
    //         </span>
    //         <span className="text-3xl">{device.product}</span>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div>asd</div>
  );
}
