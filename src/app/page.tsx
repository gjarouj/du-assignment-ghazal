"use client";

import Image from "next/image";
import Card from "@/components/card";

export default function Home() {

  return (
    <div className="mt-6 pt-24 max-w-7xl flex items-center flex-col mx-auto">
      <div className="flex-wrap flex justify-between w-full">
        <h2 className="font-bold">Already have a phone? Choose your Power Plan</h2>
        <div className="flex-wrap flex items-center justify-center">
        <fieldset>
          <legend>Show plans with:</legend>
          
          <div>
            <div>
              <input type="radio" id="flexiMin" name="minute-options" value="flexi" required />
              <label htmlFor="flexiMin">Flexi minutes (national & int'l)</label>
            </div>
            
            <div>
              <input type="radio" id="nationalMin" name="minute-options" value="national" />
              <label htmlFor="nationalMin">National minutes</label>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Show plans with:</legend>
          
          <div>
            <input type="radio" id="12MonthContract" name="contract-options" value="12Month" required />
            <label htmlFor="12MonthContract">12-month contract</label>
          </div>
          
          <div>
            <input type="radio" id="noContract" name="contract-options" value="no" />
            <label htmlFor="noContract">No contract</label>
          </div>
        </fieldset>

        </div>
      </div>
      <div className="flex-nowrap flex w-full gap-[1.5rem]">
        <Card
          cost={125}
          nationalData={4}
          flexiMin={100}
          offer={{
            noActivation: true,
            freeGB: 4,
            carryOver: false,
            prime: false,
            freeInternet: false
          }}
        />
         <Card
          cost={200}
          nationalData={26}
          flexiMin={400}
          isDoubleNationalData={true}
          limitedTimeOffer={true}
          offer={{
            noActivation: true,
            freeGB: 15,
            carryOver: true,
            prime: false,
            freeInternet: false
          }}
        />
         <Card
          cost={300}
          nationalData={50}
          flexiMin={1020}
          isDoubleNationalData={true}
          limitedTimeOffer={true}
          offer={{
            noActivation: true,
            freeGB: 25,
            carryOver: true,
            prime: true,
            freeInternet: true
          }}
        />
         <Card
          cost={500}
          nationalData={100}
          flexiMin={1500}
          isDoubleNationalData={true}
          limitedTimeOffer={true}
          offer={{
            noActivation: true,
            freeGB: 100,
            carryOver: true,
            prime: true,
            freeInternet: true,
            roamingGB: 2
          }}
        />

          {/* <Card
          cost={1000}
          nationalData={'Unlimited'}
          flexiMin={'Unlimited'}
          isDoubleNationalData={true}
        /> */}
      </div>
    </div>
  );
}
