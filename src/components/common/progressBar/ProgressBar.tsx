import React from "react";

import SvgSuccess from "src/assets/icons/SvgSuccess";

import "src/components/common/progressBar/progress-bar.css";

type ProgressProps = {
  steps: any[];
  currentStep: any;
};

export default function ProgressBar({ steps, currentStep }: ProgressProps) {
  let progress = steps.indexOf(currentStep);

  return (
    <section className="nest-progress-bar">
      {steps.map((step, index: number) =>
        step === "Complete" ? (
          <React.Fragment key={step}></React.Fragment>
        ) : (
          <React.Fragment key={step}>
            <div
              className={`step ${index < progress ? "completed" : ""} ${index > progress ? "next" : ""}`}
            >
              <div className="circle-container">
                <div className="circle">
                  {index > progress && index + 1}
                  {index < progress && <SvgSuccess fill={"#1b8576"} />}
                </div>
              </div>
              <p>{step}</p>
            </div>
            <div className="progress-meter">
              <div className="meter"></div>
            </div>
          </React.Fragment>
        ),
      )}
    </section>
  );
}
