"use client";

import Card from "@/components/card";
import RadioButtonGroup from "@/components/radioButtonGroup";
import Button from "../components/button";
import Carousel from "@/components/carousel";

export default function Home() {
  const plans = [
    {
      cost: 125,
      nationalData: 4,
      flexiMin: 100,
      offer: {
        noActivation: true,
        freeGB: 4,
        carryOver: false,
        prime: false,
        freeInternet: false,
      },
    },
    {
      cost: 200,
      nationalData: 26,
      flexiMin: 400,
      isDoubleNationalData: true,
      limitedTimeOffer: true,
      mostPopular: true,
      offer: {
        noActivation: true,
        freeGB: 15,
        carryOver: true,
        prime: false,
        freeInternet: false,
      },
    },
    {
      cost: 300,
      nationalData: 50,
      flexiMin: 1020,
      isDoubleNationalData: true,
      limitedTimeOffer: true,
      whiteCast: false,
      offer: {
        noActivation: true,
        freeGB: 25,
        carryOver: true,
        prime: true,
        freeInternet: true,
      },
    },
    {
      cost: 500,
      nationalData: 100,
      flexiMin: 1500,
      isDoubleNationalData: true,
      limitedTimeOffer: true,
      offer: {
        noActivation: true,
        freeGB: 100,
        carryOver: true,
        prime: true,
        freeInternet: true,
        roamingGB: 2,
      },
    },
    {
      cost: 1000,
      nationalData: 1000,
      flexiMin: "Unlimited" as const,
      isDoubleNationalData: true,
      limitedTimeOffer: true,
      offer: {
        noActivation: true,
        freeGB: 120,
        carryOver: true,
        prime: true,
        freeInternet: true,
        roamingGB: 5,
      },
    },
  ];

  return (
    <div className="w-[100%] mb-6 overflow-hidden">
      <div className="mt-6 py-24 mx-auto px-6 sm:px-6 lg:px-24 max-w-[100%] lg:max-w-[125rem] flex flex-col items-center">
        <div className="flex-wrap flex flex-col sm:flex-row justify-between w-[100%] mb-[3rem]">
          <h2 className="font-bold pb-4 xl:pb-0">
            Already have a phone? Choose your Power Plan
          </h2>
          <div className="flex-wrap flex items-start flex-col sm:flex-row">
            <span className="text-du-gray-dark font-medium text-[1rem] pb-4 sm:pb-0">
              Show plans with:
            </span>
            <RadioButtonGroup
              name={"minute-options"}
              legend={"Select minutes"}
              options={[
                {
                  value: "flexi",
                  label: "Flexi minutes (national & int'l)",
                },
                {
                  value: "national",
                  label: "National minutes",
                },
              ]}
            />

            <hr
              className="border-t border-du-gray w-[100%] py-2  
                          md:border-l md:border-t-0 md:w-auto  
                          md:mt-[0.25rem] md:h-[calc(100%-1.125rem)]"
            />

            <RadioButtonGroup
              name={"contract-options"}
              legend={"Select minutes"}
              options={[
                {
                  value: "12Month",
                  label: "12-month contract",
                },
                {
                  value: "no",
                  label: "No contract",
                },
              ]}
            />
            <Button type="secondary" size="small" label="Hide filters" />
          </div>
        </div>
        <div className="flex-nowrap flex w-[100%] gap-[1.5rem]">
          <Carousel>
            {plans.map((plan, index) => (
              <Card
                key={index}
                cost={plan.cost}
                whiteCast={plan.whiteCast}
                nationalData={plan.nationalData}
                flexiMin={plan.flexiMin}
                isDoubleNationalData={plan.isDoubleNationalData}
                limitedTimeOffer={plan.limitedTimeOffer}
                mostPopular={plan.mostPopular}
                offer={plan.offer}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
