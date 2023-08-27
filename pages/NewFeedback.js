import React, { useEffect, useState } from "react";

import styles from "../styles/components/main.module.scss";

const NewFeedback = () => {
  const goBack = () => {
    window.history.back();
  };

  const addFeedback = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;
    const description = e.target.description.value;

    const response = await fetch("http://localhost:8000/Suggestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, category, description }),
    });

    const data = await response.json();
    console.log({ data });

    if (data.error) {
      console.log(data.error);
    }
    window.location.href = "/";
  };

  return (
    <div className="bg-[#F7F8FD] absolute inset-0 w-full h-max -z-10">
      <div className="flex flex-col mx-[24px] md:mx-[114px] lg:mx-[450px] my-[180px]">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
          >
            <path
              d="M4.33447 9L0.334473 5L4.33447 1"
              stroke="#4661E6"
              stroke-width="2"
            />
          </svg>
          <button onClick={goBack} className="w-14 h-5">
            <h4>Go Back </h4>
          </button>
        </div>
        <div className="my-[68px] relative flex flex-col px-[42px] rounded-[10px] bg-white">
          <div className="absolute -top-6 left-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
            >
              <circle
                cx="28"
                cy="28"
                r="28"
                fill="url(#paint0_radial_0_1342)"
              />
              <path
                d="M30.3425 36V30.1657H36.0295V25.8637H30.3425V20H25.7459V25.8637H20V30.1657H25.7459V36H30.3425Z"
                fill="white"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_0_1342"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(58.184 -5.81647) rotate(129.411) scale(93.4169)"
                >
                  <stop stop-color="#E84D70" />
                  <stop offset="0.530886" stop-color="#A337F6" />
                  <stop offset="1" stop-color="#28A7ED" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          <h1 className="pt-[52px] pb-[40px]">Create New Feedback</h1>
          <form onSubmit={addFeedback}>
            <div className=" pb-4">
              <h4>Feedback Title</h4>
              <p className="text_md" style={{ color: "#647196" }}>
                Add a short, descriptive headline
              </p>
            </div>
            <input
              type="text"
              id="title"
              className="bg-[#F7F8FD] w-full h-[48px] mb-6"
            />
            <h4 for="options">Category</h4>
            <p className="text_md" style={{ color: "#647196" }}>
              Choose a category for your feedback
            </p>
            <select
              id="category"
              className={`bg-[#F7F8FD] mb-6 px-4 w-full h-[48px]  py-3 text_md flex justify-between`}
            >
              <option
                className={`${styles.hover} bg-green-300 border-b w-full text-start pb-3`}
                value="feature"
              >
                Feature
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="ui"
              >
                UI
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="ux"
              >
                UX
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="enhancement"
              >
                Enhancement
              </option>
              <option
                className={`${styles.hover} border-b w-full text-start pb-3`}
                value="bug"
              >
                Bug
              </option>
            </select>
            <div className=" pb-4">
              <h4>Feedback Details</h4>
              <p className="text_md" style={{ color: "#647196" }}>
                Include any specific comments on what should be improved, added,
                etc.
              </p>
            </div>
            <input
              type="text"
              id="description"
              className="bg-[#F7F8FD] w-full h-[96px] mb-8"
              required
            />
            <div className="flex justify-end md:flex-row flex-col gap-4 mb-10">
              <button
                onClick={() => window.history.back()}
                className="button3 md:w-[93px] w-full h-[44px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button1 md:w-[144px] w-full h-[44px]"
              >
                Add Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewFeedback;
