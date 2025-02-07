"use client";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import Badge from "./badge";
import Button from "./button";
import Tag from "./tag";
interface CardProps {
  cost: number;
  nationalData: number | "Unlimited";
  isDoubleNationalData?: boolean;
  flexiMin: number | "Unlimited";
  flexiMinOld?: number;
  limitedTimeOffer?: boolean;
  mostPopular?: boolean,
  offer: {
    noActivation: boolean;
    freeGB: number;
    carryOver: boolean;
    prime: boolean;
    freeInternet: boolean;
    roamingGB?: number;
  };
  onClick?: () => void;
}
const Card: React.FC<CardProps> = ({
  cost,
  nationalData,
  isDoubleNationalData,
  flexiMin,
  flexiMinOld,
  limitedTimeOffer,
  offer,
  mostPopular,
  onClick,
}) => {
  return (
    <div
      className="flex-1 w-[21rem] relative bg-white border-[0.03125rem] border-solid border-[rgba(0,0,0,0.12)] rounded-[0.625rem] p-[1.375rem] cursor-pointer"
      onClick={onClick}
    >
      <span className="absolute left-[-0.0625rem] top-[-0.0625rem] h-[calc(100%+0.125rem)] w-[0.5rem] [background:linear-gradient(0deg,#c724b1_15%,#00a9ce_35%)] rounded-bl-[0.625rem] rounded-tl-[0.625rem]"></span>
      {mostPopular && (<Tag text="Most popular" />)}
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-col border-b-[0.0625rem] border-b-black/12 pb-[0.75rem]">
            <span className="text-[0.9375rem] text-[#c724b1]">You Pay</span>
            <span className="text-[0.9375rem] text-[#c724b1]">
              <strong className="text-[1.375rem]">AED {cost}</strong>/month
            </span>
            <span className="text-[0.8125rem]">For 12 months + 5% VAT</span>
          </div>
          <div className="flex flex-col border-b-[0.0625rem] border-b-black/12 py-[0.75rem]">
            <span className="text-[0.9375rem] text-[#00a9ce]">You Get</span>
            <span className="text-[0.9375rem] text-[#00a9ce]">
              <strong className="text-[1.375rem]">Power Plan {cost}</strong>
            </span>
          </div>
          <div className="flex flex-col items-center justify-between py-[0.75rem] border-b-[1px] border-b-black/12">
            <div className="flex items-center justify-between pb-[8px] w-full">
              <strong className="relative">
                {" "}
                {isDoubleNationalData && nationalData !== "Unlimited" && (
                  <span className="relative text-[#cccccc] text-[0.9375rem] font-semibold pr-[4px] after:content-[''] after:absolute after:top-[calc(50%-1px)] after:left-[-3px] after:w-[calc(100%+3px)] after:h-[2px] after:bg-[linear-gradient(to_bottom,#cccccc_50%,#ffffff_50%)] after:rotate-[25deg] after:z-10">
                    {" "}
                    {nationalData / 2}
                  </span>
                )}
                {nationalData}
                {nationalData !== "Unlimited" ? " GB" : ""}{" "}
              </strong>
              <span className="text-[0.9375rem]">
                {" "}
                {isDoubleNationalData
                  ? `Double national data`
                  : `National data`}
              </span>
            </div>
            <div className="flex items-center justify-between pb-[8px] w-full">
              <strong>
                {" "}
                {flexiMinOld && (
                  <span
                    className="text-[#dededd] text-[0.9375rem] font-semibold pr-[4px]
                                relative border border-transparent before:absolute before:top-0
                                before:left-0 before:w-full before:h-full before:border-t
                                before:border-[#dededd] before:rotate-[45deg]"
                  >
                    {" "}
                    {flexiMinOld}
                  </span>
                )}
                {flexiMin}{" "}
              </strong>
              <span className="text-[0.9375rem]">Flexi minutes</span>
            </div>
          </div>
          <div className="py-[0.75rem]">
            <ul className="space-y-2">
              <li className="text-[.7647058824rem] flex items-center gap-2">
                <CheckIcon className="w-4 h-4" fontSize="inherit" />
                No activation fee. Save AED 125
              </li>
              <li className="text-[.7647058824rem] flex items-center gap-2">
                <CheckIcon className="w-4 h-4" fontSize="inherit" />
                {offer.freeGB} GB free data on WIFI UAE
              </li>
              {offer.carryOver && (
                <li className="text-[.7647058824rem] flex items-center gap-2">
                  <CheckIcon className="w-4 h-4" fontSize="inherit" />
                  Carry over data to next month
                </li>
              )}
              {offer.prime && (
                <li className="text-[.7647058824rem] flex items-center gap-2">
                  <CheckIcon className="w-4 h-4" fontSize="inherit" />
                  Amazon Prime on us
                </li>
              )}
              {offer.freeInternet && (
                <li className="text-[.7647058824rem] flex items-center gap-2">
                  <CheckIcon className="w-4 h-4" fontSize="inherit" />
                  Free Internet Calling Pack
                </li>
              )}
              {offer.roamingGB && (
                <li className="text-[.7647058824rem] flex items-center gap-2">
                  <CheckIcon className="w-4 h-4" fontSize="inherit" />
                  Roaming {offer.roamingGB} GB
                </li>
              )}
            </ul>
          </div>
        </div>
        <div>
          <div
            className={`pt-[0.75rem]${
              limitedTimeOffer ? " border-t-[1px] border-t-black/12" : ""
            }`}
          >
            {limitedTimeOffer && (
              <div className="pb-[0.75rem]">
                <Badge text="Limited time offer"></Badge>
                <p className="text-[.7647058824rem] pt-1">
                  <strong>The Entertainer</strong> on us for 12 months
                </p>
              </div>
            )}
            <div className="border-t-[1px] border-t-black/12 pt-[0.75rem] flex justify-between align-center">
              <Button type={"tertiary"} label={"What you get"}/>
              <Button type={"secondary"} label={"Select"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
